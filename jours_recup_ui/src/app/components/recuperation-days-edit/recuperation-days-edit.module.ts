import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperationDaysEditComponent } from './recuperation-days-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TourMatMenuModule } from 'ngx-ui-tour-md-menu';



@NgModule({
  declarations: [
    RecuperationDaysEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TourMatMenuModule
  ],
  exports: [
    RecuperationDaysEditComponent
  ]
})
export class RecuperationDaysEditModule { }
