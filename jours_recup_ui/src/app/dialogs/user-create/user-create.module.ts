import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TourMatMenuModule } from 'ngx-ui-tour-md-menu';



@NgModule({
  declarations: [
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    TourMatMenuModule,
  ],
  providers: [
    DialogService
  ]
})
export class UserCreateModule { }
