import Dexie, { PromiseExtended, Table } from 'dexie'
import { User } from './entities/user'
import { History } from './entities/history'
import { deburr } from 'lodash'
import 'dexie-export-import'

export class AppDB extends Dexie {
    private static readonly MAX_HISTORY_ALL = 20000;

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

    getUserHistory(userId: number): Promise<History[]> {
        return this.history
            .orderBy('date')
            .filter((history) => history.userId == userId)
            .reverse()
            .toArray()
    }

    clearUserHistory(userId: number) {
        return this.history.filter((history) => history.userId == userId).delete()
    }

    allHistory() {
        return this.history
            .orderBy('date')
            .reverse()
            .limit(AppDB.MAX_HISTORY_ALL)
            .toArray()
    }

    exportDb() {
        return this.export()
    }

    importDb(blob: Blob) {
        return db.import(blob, {
            clearTablesBeforeImport: true
        })
    }
}

export const db = new AppDB()
