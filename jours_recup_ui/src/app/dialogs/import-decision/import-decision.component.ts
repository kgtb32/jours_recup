import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-import-decision',
  templateUrl: './import-decision.component.html',
  styleUrl: './import-decision.component.scss'
})
export class ImportDecisionComponent {

  importChoice: 'normal' | 'conflicts' = 'normal'

  constructor(private readonly dbService: DbService, private readonly ref: DynamicDialogRef) { }

  fileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files
    if (files?.[0]) {
      this.importChoice == 'normal' ? this.normalImport(files[0]) : this.conflictImport(files[0])
    }
  }

  private conflictImport(file: File) {
    file.text()
      .then(file => this.dbService.conflictImport(file))
      .then(e => console.log(e))
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
