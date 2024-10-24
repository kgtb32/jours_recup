import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { InputTextModule } from 'primeng/inputtext'
import { TimelineModule } from 'primeng/timeline'
import { EditComponentModule } from '../../components/edit-component/edit-component.module'
import { UserDetailComponent } from './user-detail.component'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { RecuperationDaysEditModule } from '../../components/recuperation-days-edit/recuperation-days-edit.module'

@NgModule({
    declarations: [UserDetailComponent],
    imports: [
        CommonModule,
        DynamicDialogModule,
        InputTextModule,
        EditComponentModule,
        CardModule,
        TimelineModule,
        ButtonModule,
        RecuperationDaysEditModule
    ],
})
export class UserDetailModule { }
