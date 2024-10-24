import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConflictResolutionComponent } from './conflict-resolution.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ConflictResolutionComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class ConflictResolutionModule { }
