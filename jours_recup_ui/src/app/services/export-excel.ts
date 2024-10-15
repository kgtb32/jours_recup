import { User } from "../database/entities/user";
import { Workbook } from 'exceljs'

export async function exportExcel(user: User[]) {
    const wb = new Workbook();
    const sheet = wb.addWorksheet("Personnes")
    sheet.autoFilter = "A1:C1"
    sheet.addRow(["Nom", "Prénom", "Jours de récupération"])
    user.forEach(user => {
        sheet.addRow([user.firstName, user.lastName, user.recuperationDays])
    })
    const file = await wb.xlsx.writeBuffer();
    const blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8' })
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "Export jours de récupération.xlsx"
    link.click();

}