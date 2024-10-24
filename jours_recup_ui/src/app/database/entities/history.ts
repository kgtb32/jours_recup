export type Action = 'CREATE' | 'CREDIT_EDIT' | 'FIRSTNAME_EDIT' | 'LASTNAME_EDIT'

export interface History {
    id?: string
    userId: string
    date: Date
    action: Action
    reason?: string
    oldValue?: string
    newValue?: string
}
