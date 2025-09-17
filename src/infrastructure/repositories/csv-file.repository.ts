import type { CsvRow } from "../../domain/entities/csv-data"
import { CsvParser } from "../../domain/services/csv-parser"
import { FileRepository } from "./file-repository"

export class CsvFileRepository {
  constructor(
    private readonly fileRepository = new FileRepository(),
    private readonly csvParser = new CsvParser(),
  ) {}

  async readCsvFile(fileName: string): Promise<CsvRow[]> {
    const isProduction = process.env.NODE_ENV === "production"
    const URL = isProduction
      ? `https://${process.env.VERCEL_URL}/data/${fileName}`
      : `http://localhost:3000/data/${fileName}`
    const content = await fetch(URL)
    const text = await content.text()
    console.log(text)
    const csvData = this.csvParser.parse(text)

    console.log(csvData)
    return csvData.rows
  }
}
