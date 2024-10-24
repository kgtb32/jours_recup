import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportDecisionComponent } from './import-decision.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImportDecisionComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ImportDecisionComponent
  ]
})
export class ImportDecisionModule { }
