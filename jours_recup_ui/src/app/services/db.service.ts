import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';
import { db } from '../database/db';
import { Action, History } from '../database/entities/history';
import { User } from '../database/entities/user';
import { DexieExportedFile } from '../models/export-file/export-file';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public readonly database = db

  public conflictImport(jsonText: string) {
    try {
      const json = <DexieExportedFile>JSON.parse(jsonText);
      const [userTable, historyTable] = [this.findTable("users", json), this.findTable("history", json)]
      const conflictedUsers = Promise.all(userTable.map(user => this.handleUser(user)))
      historyTable.forEach(history => this.handleHistory(history))
      return conflictedUsers.then(users => users.filter(u => u.conflict === true))
    }
    catch (err) {
      return Promise.reject(<Error>err)
    }
  }

  private findTable(tableName: string, json: DexieExportedFile) {
    return json.data.data.find(table => table.tableName == tableName)?.rows ?? []
  }

  private handleUser(row: { [key: string]: string | number }) {
    return this.database.getUserById(<string>row['id']).then((userExists) =>
      userExists ? this.userExists(row, userExists) : this.userNotExists(row)
    )
  }

  private userExists(row: { [key: string]: string | number }, user: User) {
    const newUser = this.mapUser(row)
    return Promise.resolve({
      conflict: !isEqual(user, newUser), user, newUser
    })
  }

  private mapUser(row: { [key: string]: string | number }): User {
    return {
      id: <string>row['id'],
      firstName: <string>row['firstName'],
      lastName: <string>row['lastName'],
      recuperationDays: <number>row['recuperationDays']
    }
  }

  private mapHistory(row: { [key: string]: string | number }): History {
    return {
      id: <string>row['id'],
      userId: <string>row['userId'],
      action: <Action>row['action'],
      date: new Date(<number>row['date']),
      newValue: <string | undefined>row['newValue'],
      oldValue: <string | undefined>row['oldValue'],
      reason: <string | undefined>row['reason'],
    }
  }

  private userNotExists(row: { [key: string]: string | number }) {
    return this.database.users.add(this.mapUser(row)).then(() => ({ conflict: false }))
  }

  private historyDoesntExsits(row: { [key: string]: string | number }) {
    return this.database.history.add(this.mapHistory(row)).then(() => ({ conflict: false }))
  }

  private handleHistory(row: { [key: string]: string | number }) {
    return this.database.getHistoryById(<string>row['id']).then((historyExists) =>
      historyExists ? ({ conflict: false }) : this.historyDoesntExsits(row)
    )
  }
}
