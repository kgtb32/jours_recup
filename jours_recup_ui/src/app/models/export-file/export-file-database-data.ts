export interface ExportFileDatabaseData {
    tableName: string
    inbound: boolean
    rows: { [key: string]: string | number }[]
}