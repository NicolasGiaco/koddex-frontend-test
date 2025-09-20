import type { NodeEntity } from "../entities/node"
import type { TreeNodeEntity } from "../entities/tree-node"

export interface TreeRepository {
  getAll(): Promise<TreeNodeEntity[]>
  save(nodes: TreeNodeEntity[]): Promise<void>
  findById(nodeId: string): Promise<TreeNodeEntity | null>
  updateNode(nodeId: string, updates: Partial<NodeEntity>): Promise<void>
  deleteNode(nodeId: string): Promise<void>
  addNode(node: TreeNodeEntity): Promise<void>
}
