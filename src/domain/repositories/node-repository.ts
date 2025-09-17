import type { Node } from "../entities/node"
import type { NodeId } from "../entities/node-id"
import type { NodeStatus } from "../entities/node-status"
import type { NodeType } from "../entities/node-type"

export interface NodeRepository {
  findById(id: NodeId): Promise<Node | null>
  findAll(): Promise<Node[]>
  findByType(type: NodeType): Promise<Node[]>
  findByStatus(status: NodeStatus): Promise<Node[]>
  exists(id: NodeId): Promise<boolean>
}
