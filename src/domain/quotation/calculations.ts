import type { QuoteLine } from './types'

export type ApprovedRate = {
  catalogItemId: string
  unitPricePaise: bigint
}

/**
 * Resolves only rates supplied by the application's approved data source.
 * Missing rates are intentionally returned instead of guessed.
 */
export function findMissingRates(lines: QuoteLine[], rates: ApprovedRate[]): string[] {
  const availableRates = new Set(rates.map((rate) => rate.catalogItemId))
  return lines.filter((line) => !availableRates.has(line.catalogItemId)).map((line) => line.catalogItemId)
}
