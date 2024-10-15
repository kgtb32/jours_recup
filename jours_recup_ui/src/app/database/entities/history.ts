export type Action = 'CREATE' | 'CREDIT_EDIT' | 'FIRSTNAME_EDIT' | 'LASTNAME_EDIT'

export interface History {
    id?: number
    userId: number
    date: Date
    action: Action
    oldValue?: string
    newValue?: string
}
