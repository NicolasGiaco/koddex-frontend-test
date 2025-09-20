import type { NodeEntity } from "../entities/node"
import type { NodeStatus } from "../entities/node-status"
import type { NodeType } from "../entities/node-type"

export interface NodeRepository {
  findById(id: string): Promise<NodeEntity | null>
  findAll(): Promise<NodeEntity[]>
  findByType(type: NodeType): Promise<NodeEntity[]>
  findByStatus(status: NodeStatus): Promise<NodeEntity[]>
  exists(id: string): Promise<boolean>
}
