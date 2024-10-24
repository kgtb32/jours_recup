import { Component, OnInit } from '@angular/core'
import { Message } from 'primeng/api'
import { DialogService } from 'primeng/dynamicdialog'
import { User } from '../../database/entities/user'
import { UserCreateComponent } from '../../dialogs/user-create/user-create.component'
import { UserDetailComponent } from '../../dialogs/user-detail/user-detail.component'
import { DbService } from '../../services/db.service'
import { exportExcel } from '../../services/export-excel'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    filter: string = ""

    public readonly noDataMessage: Message[] = [
        {
            detail: 'Aucune entrée dans la base de données',
            severity: 'warn',
            closable: false
        },
    ]

    users: User[] = []

    constructor(private readonly dbService: DbService, private readonly dialogService: DialogService) { }

    doExportExcel() {
        exportExcel(this.users)
    }

    doFilter() {
        if (this.filter) {
            this.dbService.database.findUsers(this.filter)
                .then((users) => this.users = users)
                .catch(e => alert(e))
        }
        else {
            this.getUsers()
        }
    }

    ngOnInit(): void {
        this.getUsers()
    }

    private getUsers() {
        this.dbService.database
            .getUsers()
            .then((users) => (this.users = users))
            .catch((error) => alert(error))
    }

    addUsers() {
        this.dialogService.open(UserCreateComponent, { header: 'Ajouter une personne' }).onClose.subscribe({
            next: user => {
                if (user) {
                    this.filter = `${user.lastName} ${user.firstName}`
                }
                this.doFilter()
            },
        })
    }

    deleteUser(userId: number) {
        this.dbService.database
            .deleteUser(userId)
            .then(() => this.getUsers())
            .catch((error) => alert(error))
    }

    async showUserDetail(user: User) {
        const history = await this.dbService.database.getUserHistory(user.id!)
        this.dialogService
            .open(UserDetailComponent, {
                header: 'Détail de la personne',
                data: {
                    user,
                    history,
                },
            })
            .onClose.subscribe({
                next: () => this.getUsers(),
            })
    }
}