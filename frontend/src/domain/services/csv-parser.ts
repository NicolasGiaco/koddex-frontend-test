import Papa from "papaparse"
import type { CsvData, CsvRow } from "../entities/csv-data"
import { CsvParseError } from "../entities/csv-data"

export interface CsvParserConfig {
  delimiter?: string
  skipEmptyLines?: boolean
  trimValues?: boolean
}

export class CsvParser {
  constructor(private readonly config: CsvParserConfig = {}) {}

  parse(content: string): CsvData {
    const delimiter = this.config.delimiter ?? ","
    const skipEmptyLines = this.config.skipEmptyLines ?? true
    const trimValues = this.config.trimValues ?? true

    try {
      const result = Papa.parse<string[]>(content, {
        delimiter,
        skipEmptyLines,
        dynamicTyping: false,
        transform: trimValues ? value => value.trim() : undefined,
      })

      if (result.errors.length > 0) {
        const firstError = result.errors[0]
        throw new CsvParseError(
          `PapaParse error: ${firstError.message}`,
          firstError.row !== undefined ? firstError.row + 1 : undefined,
        )
      }

      const data = result.data
      if (!data || data.length === 0) {
        throw new CsvParseError("CSV content is empty")
      }

      const headers = data[0] as string[]
      if (!headers || headers.length === 0) {
        throw new CsvParseError("Missing header row")
      }

      const rows: CsvRow[] = []
      for (let i = 1; i < data.length; i++) {
        const values = data[i] as string[]
        const row: CsvRow = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })
        rows.push(row)
      }

      return {
        headers,
        rows,
        rowCount: rows.length,
      }
    } catch (error) {
      if (error instanceof CsvParseError) {
        throw error
      }
      throw new CsvParseError(`Failed to parse CSV: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}
