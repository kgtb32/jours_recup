import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DbService } from '../../services/db.service';
import { SaveStateService } from '../../services/save-state.service';


export interface UserCreateForm {
  firstName: FormControl<string>,
  lastName: FormControl<string>
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  public readonly formGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
  })

  constructor(
    private readonly dbService: DbService,
    private readonly ref: DynamicDialogRef,
    private readonly saveStateService: SaveStateService
  ) {
  }

  close() {
    this.ref.close()
  }

  createUser() {
    const user = {
      firstName: this.formGroup.value.firstName!,
      lastName: this.formGroup.value.lastName!,
      recuperationDays: 0
    }
    this.dbService.database.addUser(user)
      .then(id => this.dbService.database.addHistory({ action: 'CREATE', date: new Date(), userId: id }))
      .then(() => {
        this.saveStateService.unsaved()
        this.ref.close(user)
      })
      .catch(e => alert("error !" + e))
  }
}
