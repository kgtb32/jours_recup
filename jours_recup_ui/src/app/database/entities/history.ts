export type Action = 'CREATE' | 'CREDIT_EDIT' | 'FIRSTNAME_EDIT' | 'LASTNAME_EDIT'

export interface History {
    id?: number
    userId: number
    date: Date
    action: Action
    reason?: string
    oldValue?: string
    newValue?: string
}
