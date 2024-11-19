import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditComponentComponent } from './edit-component.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { TourMatMenuModule } from 'ngx-ui-tour-md-menu'

@NgModule({
    declarations: [EditComponentComponent],
    imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, TourMatMenuModule],
    exports: [EditComponentComponent],
})
export class EditComponentModule { }
