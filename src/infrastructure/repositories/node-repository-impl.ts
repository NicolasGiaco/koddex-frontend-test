import type { CsvRow } from "../../domain/entities/csv-data"
import type { NodeEntity } from "../../domain/entities/node"
import type { NodeStatus } from "../../domain/entities/node-status"
import { NodeStatus as NodeStatusEnum } from "../../domain/entities/node-status"
import type { NodeType } from "../../domain/entities/node-type"
import { NodeType as NodeTypeEnum } from "../../domain/entities/node-type"
import type { NodeRepository } from "../../domain/repositories/node-repository"
import { CsvFileRepository } from "./csv-file.repository"

export class NodeRepositoryImpl implements NodeRepository {
  constructor(
    private readonly csvRepository = new CsvFileRepository(),
    private readonly fileName = "/src/data/nodes.csv",
  ) {}

  async findById(id: string): Promise<NodeEntity | null> {
    const nodes = await this.findAll()
    return nodes.find(node => node.id === id) || null
  }

  async findAll(): Promise<NodeEntity[]> {
    const csvData = await this.csvRepository.readCsvFile(this.fileName)
    return csvData.map(row => this.mapCsvRowToNode(row))
  }

  async findByType(type: NodeType): Promise<NodeEntity[]> {
    const allNodes = await this.findAll()
    return allNodes.filter(node => node.type === type)
  }

  async findByStatus(status: NodeStatus): Promise<NodeEntity[]> {
    const allNodes = await this.findAll()
    return allNodes.filter(node => node.status === status)
  }

  async exists(id: string): Promise<boolean> {
    const node = await this.findById(id)
    return node !== null
  }

  private mapCsvRowToNode(row: CsvRow): NodeEntity {
    const id = row.node_id || ""
    const name = row.name || ""
    const type = NodeTypeEnum.fromString(row.type) || NodeTypeEnum.TASK
    const status = NodeStatusEnum.fromString(row.status) || NodeStatusEnum.BACKLOG
    const description = row.description || undefined
    const startDate = row.start_date ? new Date(row.start_date) : undefined
    const endDate = row.end_date ? new Date(row.end_date) : undefined

    return {
      id,
      name,
      type,
      status,
      description,
      startDate,
      endDate,
    }
  }
}
