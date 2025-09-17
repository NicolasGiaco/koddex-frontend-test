import type { CsvData, CsvRow } from "../../domain/entities/csv-data"
import { CsvParser } from "../../domain/services/csv-parser"
import { FileRepository } from "./file-repository"

export class CsvFileRepository {
  constructor(
    private readonly fileRepository = new FileRepository(),
    private readonly csvParser = new CsvParser(),
  ) {}

  async readCsvFile(fileName: string): Promise<CsvRow[]> {
    console.log("Reading CSV file:", fileName)
    const content = await this.fileRepository.readFile(fileName)
    console.log("CSV Content:", content)
    const csvData = this.csvParser.parse(content)
    return csvData.rows
  }

  async readCsvFileAsync(fileName: string): Promise<CsvRow[]> {
    const content = await this.fileRepository.readFile(fileName)
    const csvData = this.csvParser.parse(content)
    return csvData.rows
  }

  async readCsvFileWithMetadata(fileName: string): Promise<CsvData> {
    const content = await this.fileRepository.readFile(fileName)
    return this.csvParser.parse(content)
  }

  async readCsvFileWithMetadataAsync(fileName: string): Promise<CsvData> {
    const content = await this.fileRepository.readFile(fileName)
    return this.csvParser.parse(content)
  }
}
