import { ExportFileDatabaseDescription } from "./export-file-database-description"

export interface DexieExportedFile {
    formatName: string
    formatVersion: number
    data: ExportFileDatabaseDescription
}