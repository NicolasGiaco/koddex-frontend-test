import { promises as fs } from "node:fs"
import type { IFileRepository } from "@/domain/repositories/file-repository"

export class FileRepository implements IFileRepository {
  constructor(private readonly basePath: string = process.cwd()) {}

  async readFile(filePath: string): Promise<string> {
    try {
      const fullPath = this.resolvePath(filePath)

      return await fs.readFile(fullPath, "utf-8")
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  private resolvePath(filePath: string): string {
    return this.basePath + filePath
  }
}
