import { Injectable } from '@angular/core';
import { db } from '../database/db';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public readonly database = db
}
