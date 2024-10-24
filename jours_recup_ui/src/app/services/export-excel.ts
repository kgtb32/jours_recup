import { History } from "../database/entities/history";
import { User } from "../database/entities/user";
import { Workbook } from 'exceljs'
import { eventTranslations } from "../statics/event-translations";
import { downloadFile } from "./file-download";

export async function exportExcel(user: User[], history: History[]) {
    const wb = new Workbook();
    addUsers(wb, user)
    addHistory(wb, history, user)
    const file = await wb.xlsx.writeBuffer();
    const blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8' })
    downloadFile(blob, "Export jours de récupération.xlsx")
}

function addUsers(wb: Workbook, user: User[]) {
    const sheet = wb.addWorksheet("Personnes")
    sheet.autoFilter = "A1:C1"
    sheet.addRow(["Nom", "Prénom", "Jours de récupération"])
    user.forEach(user => {
        sheet.addRow([user.firstName, user.lastName, user.recuperationDays])
    })
}

function addHistory(wb: Workbook, history: History[], user: User[]) {
    const usersMap: { [key: number]: { firstName: string, lastName: string } } =
        user.reduce((prev, curr) => ({ ...prev, [curr.id!]: { firstName: curr.firstName, lastName: curr.lastName } }), {})
    const sheet = wb.addWorksheet("Historique")
    sheet.autoFilter = ""
    sheet.addRow(["Nom", "Prénom", "Action", "Date", 'Ancienne valeur', 'Nouvelle valeur', 'Motif'])
    history.forEach(currentHistory => {
        sheet.addRow([
            usersMap[currentHistory.userId].lastName,
            usersMap[currentHistory.userId].firstName,
            eventTranslations[currentHistory.action],
            currentHistory.date,
            currentHistory.oldValue,
            currentHistory.newValue,
            currentHistory.reason
        ])
    })
}