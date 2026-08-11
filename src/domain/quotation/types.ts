/** Values entered in a quote are references to approved catalogue data, not prices. */
export type QuoteLine = {
  catalogItemId: string
  quantity: number
  unit: string
}

export type QuoteTaxSelection = {
  enabled: boolean
  taxProfileId?: string
}

export type QuoteDraft = {
  customerId?: string
  lines: QuoteLine[]
  tax: QuoteTaxSelection
  templateId?: string
}
