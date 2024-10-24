import { ExportFileDatabaseData } from "./export-file-database-data"
import { ExportFileDatabaseTable } from "./export-file-database-tables"

export interface ExportFileDatabaseDescription {
    databaseName: string
    databaseVersion: number
    tables: ExportFileDatabaseTable
    data: ExportFileDatabaseData[]
}