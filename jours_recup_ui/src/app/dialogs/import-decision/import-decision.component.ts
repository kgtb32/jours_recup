import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConflictResolutionComponent } from '../conflict-resolution/conflict-resolution.component';

@Component({
  selector: 'app-import-decision',
  templateUrl: './import-decision.component.html',
  styleUrl: './import-decision.component.scss'
})
export class ImportDecisionComponent {

  importChoice: 'normal' | 'conflicts' = 'normal'

  constructor(
    private readonly dbService: DbService,
    private readonly ref: DynamicDialogRef,
    private readonly dialogService: DialogService
  ) { }

  fileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files
    if (files?.[0]) {
      this.importChoice == 'normal' ? this.normalImport(files[0]) : this.conflictImport(files[0])
    }
  }

  private conflictImport(file: File) {
    file.text()
      .then(file => this.dbService.conflictImport(file))
      .then(conflicts => {
        this.dialogService.open(ConflictResolutionComponent, {
          data: {
            conflicts
          }
        }).onClose.subscribe({
          next: () => this.ref.close()
        })
      })
      .catch(e => alert("fail " + e))
  }

  private normalImport(file: File) {
    this.dbService.database
      .importDb(file)
      .then(() => alert("upload OK"))
      .catch(e => alert("fail " + e))
      .finally(() => this.afterUpload())
  }

  private afterUpload() {
    this.ref.close()
  }
}
