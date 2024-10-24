import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperationDaysEditComponent } from './recuperation-days-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    RecuperationDaysEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    RecuperationDaysEditComponent
  ]
})
export class RecuperationDaysEditModule { }
