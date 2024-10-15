import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.scss'
})
export class EditComponentComponent<DataType> {

  @Input()
  description!: string

  @Output()
  dataChanged: EventEmitter<DataType> = new EventEmitter<DataType>()

  @Input()
  set data(data: DataType) {
    this._data = data
    this.originalData = data
  }

  private originalData!: DataType

  _data!: DataType

  isEditing: boolean = false

  commit() {
    this.isEditing = false
    this.dataChanged.next(this._data)
    this.originalData = this._data
  }

  cancel() {
    this.isEditing = false
    this._data = this.originalData
  }
}
