import Dexie, { PromiseExtended, Table } from 'dexie'
import { User } from './entities/user'
import { History } from './entities/history'
import { deburr } from 'lodash'

export class AppDB extends Dexie {
    users!: Table<User, number>
    history!: Table<History, number>

    constructor() {
        super('daysRecup')
        this.version(1).stores({
            users: '++id',
            history: '++id, userId, date',
        })
    }

    addUser(user: User): PromiseExtended<number> {
        return this.users.add(user)
    }

    editUser(id: number, user: User): PromiseExtended<number> {
        return this.users.update(id, user)
    }

    deleteUser(id: number): Promise<[void, number]> {
        return Promise.all([
            this.users.delete(id),
            this.clearUserHistory(id)
        ])
    }


    findUsers(query: string) {
        return this.users
            .filter(user =>
                `${deburr(user.lastName.toLowerCase())} ${deburr(user.firstName.toLowerCase())} ${deburr(user.lastName.toLowerCase())} `
                    .includes(deburr(query.toLowerCase()))
            )
            .toArray()
    }

    getUsers() {
        return this.users.toArray()
    }

    addHistory(history: History) {
        return this.history.add(history)
    }

    private getHistory(userId: number) {
        return this.history
            .orderBy('date')
            .reverse()
            .filter((history) => history.userId == userId)
    }

    maintainHistory(userId: number) {
        return this.getHistory(userId)
            .offset(20)
            .delete()
    }

    getUserHistory(userId: number): Promise<History[]> {
        return new Promise<History[]>((resolve, reject) => {
            this.maintainHistory(userId)
                .then(() => this.getHistory(userId).toArray())
                .then(resolve)
                .catch(reject)

        })
    }

    clearUserHistory(userId: number) {
        return this.history.filter((history) => history.userId == userId).delete()
    }
}

export const db = new AppDB()
