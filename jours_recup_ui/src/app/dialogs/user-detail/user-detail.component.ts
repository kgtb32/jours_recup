import { Component } from '@angular/core'
import dayjs from 'dayjs'
import { DynamicDialogConfig } from 'primeng/dynamicdialog'
import { History } from '../../database/entities/history'
import { User } from '../../database/entities/user'
import { RecuperationDays } from '../../models/recuperation-days'
import { DbService } from '../../services/db.service'
import { eventTranslations } from '../../statics/event-translations'
import { SaveStateService } from '../../services/save-state.service'

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
    public user: User
    public history: History[]

    public readonly eventsTranslations: { [key: string]: string } = eventTranslations

    constructor(
        readonly config: DynamicDialogConfig,
        private readonly dbService: DbService,
        private readonly saveStateService: SaveStateService
    ) {
        this.user = config.data.user
        this.history = config.data.history
    }

    editUserInfo(type: 'FIRSTNAME_EDIT' | 'LASTNAME_EDIT', value: string) {
        const finalUser: User =
            type == 'FIRSTNAME_EDIT'
                ? {
                    ...this.user,
                    firstName: value,
                }
                : {
                    ...this.user,
                    lastName: value,
                }
        Promise.all([
            this.dbService.database.editUser(this.user.id!, finalUser),
            this.dbService.database.history.add({
                action: type,
                date: new Date(),
                userId: this.user.id!,
                newValue: value,
                oldValue: type == 'FIRSTNAME_EDIT' ? this.user.firstName : this.user.lastName,
            }),
        ])
            .then(() => this.dbService.database.getUserHistory(this.user.id!))
            .then((history) => this.valuesUpdated(history, finalUser))
            .catch((e) => alert(e))
    }

    private valuesUpdated(history: History[], finalUser: User) {
        this.history = history
        this.user = finalUser
        this.saveStateService.unsaved()
    }

    editRecuperationDays(value: RecuperationDays) {
        const finalUser = { ...this.user, recuperationDays: value.days }
        Promise.all([
            this.dbService.database.editUser(this.user.id!, finalUser),
            this.dbService.database.addHistory({
                action: 'CREDIT_EDIT',
                date: new Date(value.date),
                userId: this.user.id!,
                newValue: value.days.toString(),
                oldValue: this.user.recuperationDays.toString(),
                reason: value.reason
            }),
        ])
            .then(() => this.dbService.database.getUserHistory(this.user.id!))
            .then((history) => this.valuesUpdated(history, finalUser))
            .catch((e) => alert(e))
    }

    clearHistory() {
        this.dbService.database
            .clearUserHistory(this.user.id!)
            .then(() => (this.history = []))
            .catch((e) => alert(e))
    }

    getDate(date: Date) {
        return dayjs(date).format("DD/MM/YYYY")
    }
}
