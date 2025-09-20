export type CsvRow = Record<string, string>

export interface CsvData {
  headers: string[]
  rows: CsvRow[]
  rowCount: number
}

export class CsvParseError extends Error {
  constructor(
    message: string,
    public readonly line?: number,
  ) {
    super(message)
    this.name = "CsvParseError"
  }
}
