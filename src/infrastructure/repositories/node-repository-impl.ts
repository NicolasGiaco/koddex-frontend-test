import type { CsvRow } from "../../domain/entities/csv-data"
import type { Node } from "../../domain/entities/node"
import { Node as NodeEntity } from "../../domain/entities/node"
import type { NodeId } from "../../domain/entities/node-id"
import { NodeId as NodeIdEntity } from "../../domain/entities/node-id"
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

  async findById(id: NodeId): Promise<Node | null> {
    const nodes = await this.findAll()
    return nodes.find(node => node.getId().equals(id)) || null
  }

  async findAll(): Promise<Node[]> {
    const csvData = await this.csvRepository.readCsvFile(this.fileName)
    return csvData.map(row => this.mapCsvRowToNode(row))
  }

  async findByType(type: NodeType): Promise<Node[]> {
    const allNodes = await this.findAll()
    return allNodes.filter(node => node.getType() === type)
  }

  async findByStatus(status: NodeStatus): Promise<Node[]> {
    const allNodes = await this.findAll()
    return allNodes.filter(node => node.getStatus() === status)
  }

  async exists(id: NodeId): Promise<boolean> {
    const node = await this.findById(id)
    return node !== null
  }

  private mapCsvRowToNode(row: CsvRow): Node {
    const id = new NodeIdEntity(row.node_id)
    const name = row.name || ""
    const type = NodeTypeEnum.fromString(row.type) || NodeTypeEnum.TASK
    const status = NodeStatusEnum.fromString(row.status) || NodeStatusEnum.BACKLOG
    const description = row.description || undefined
    const startDate = row.start_date ? new Date(row.start_date) : undefined
    const endDate = row.end_date ? new Date(row.end_date) : undefined

    return new NodeEntity(id, name, type, status, description, startDate, endDate)
  }
}
