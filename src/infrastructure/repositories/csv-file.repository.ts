import type { CsvRow } from "../../domain/entities/csv-data"
import { CsvParser } from "../../domain/services/csv-parser"
import { FileRepository } from "./file-repository"

export class CsvFileRepository {
  constructor(
    private readonly fileRepository = new FileRepository(),
    private readonly csvParser = new CsvParser(),
  ) {}

  async readCsvFile(fileName: string): Promise<CsvRow[]> {
    const content = await this.fileRepository.readFile(fileName)
    const csvData = this.csvParser.parse(content)
    return csvData.rows
  }
}
