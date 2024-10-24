import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveStateService {

  public hasSaved: boolean = false;

  constructor() {
    this.hasSaved = localStorage.getItem('saved') == 'true'
  }

  save(): void {
    this.hasSaved = true
    localStorage.setItem('saved', "true")
  }

  unsaved() {
    this.hasSaved = false
    localStorage.setItem('saved', "false")
  }
}
