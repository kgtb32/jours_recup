import { Component } from '@angular/core';
import { Conflict } from '../../models/conflict';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../database/entities/user';
import { DbService } from '../../services/db.service';
import { SaveStateService } from '../../services/save-state.service';

@Component({
  selector: 'app-conflict-resolution',
  templateUrl: './conflict-resolution.component.html',
  styleUrl: './conflict-resolution.component.scss'
})
export class ConflictResolutionComponent {

  private readonly conflicts: Conflict[]

  currentConflictIndex: number = 0

  get currentConflict(): Conflict {
    return this.conflicts[this.currentConflictIndex]
  }

  constructor(
    private readonly config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly dbService: DbService,
    private readonly saveStateService: SaveStateService
  ) {
    this.conflicts = config.data?.['conflicts'] ?? []
    if (this.conflicts.length == 0) {
      ref.close()
    }
    this.saveStateService.unsaved()
    this.updateHeader()
  }

  updateHeader() {
    this.config.header = `Résolution de conflits ${this.currentConflictIndex + 1}/${this.conflicts.length}`
  }

  accept(user: User, previous: User) {
    Promise.all([
      this.dbService.database.users.update(user.id!, user),
      this.dbService.database.addHistory({
        action: 'CONFLICT',
        date: new Date(),
        userId: user.id!,
        newValue: `${user.firstName} / ${user.lastName} / ${user.recuperationDays}`,
        oldValue: `${previous.firstName} / ${previous.lastName} / ${previous.recuperationDays}`
      })
    ])

      .then(() => {
        this.currentConflictIndex++
        this.updateHeader()
        if (this.currentConflictIndex > this.conflicts.length - 1) {
          this.ref.close()
        }
      }).catch(e => alert(e))
  }
}
