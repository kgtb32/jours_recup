import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecuperationDays } from '../../models/recuperation-days';

@Component({
  selector: 'app-recuperation-days-edit',
  templateUrl: './recuperation-days-edit.component.html',
  styleUrl: './recuperation-days-edit.component.scss'
})
export class RecuperationDaysEditComponent {

  @Output()
  dataChanged: EventEmitter<RecuperationDays> = new EventEmitter();

  @Input()
  set baseData(days: number) {
    this._baseData = days
    this.formGroup.reset()
    this.formGroup.patchValue({ days })
  }

  _baseData!: number

  isEditing: boolean = false;

  formGroup: FormGroup = new FormGroup({
    days: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.pattern("\\d+")],),
    date: new FormControl({ value: '', disabled: true }, [Validators.required]),
    reason: new FormControl({ value: '', disabled: true }, [Validators.required])
  })

  commit() {
    console.log(this.formGroup.value)
    this.dataChanged.next(this.formGroup.value)
    this.reset()
  }

  private reset() {
    this.isEditing = false
    this.baseData = this._baseData
    Object.values(this.formGroup.controls).forEach(control => control.disable())
  }

  cancel() {
    this.formGroup.reset()
    this.reset()
  }

  edit() {
    this.isEditing = true
    Object.values(this.formGroup.controls).forEach(control => control.enable())
  }
}
