import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { UserCreateModule } from '../../dialogs/user-create/user-create.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserDetailModule } from '../../dialogs/user-detail/user-detail.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { ImportDecisionModule } from '../../dialogs/import-decision/import-decision.module';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    UserCreateModule,
    UserDetailModule,
    ImportDecisionModule,
    ToolbarModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    OverlayModule,
    OverlayPanelModule,
  ]
})
export class HomeModule { }
