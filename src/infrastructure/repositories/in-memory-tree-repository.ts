import { mockTreeData } from "@/data/mockData"
import type { NodeEntity } from "@/domain/entities/node"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import type { TreeRepository } from "@/domain/repositories/tree-repository"
import { TreeNodeOperations } from "@/domain/services/tree-node-operations"

export class InMemoryTreeRepository implements TreeRepository {
  private nodes: TreeNodeEntity[] = mockTreeData

  async getAll(): Promise<TreeNodeEntity[]> {
    return Promise.resolve([...this.nodes])
  }

  async save(nodes: TreeNodeEntity[]): Promise<void> {
    this.nodes = [...nodes]
    return Promise.resolve()
  }

  async findById(nodeId: string): Promise<TreeNodeEntity | null> {
    const found = TreeNodeOperations.findNodeById(this.nodes, nodeId)
    return Promise.resolve(found)
  }

  async updateNode(nodeId: string, updates: Partial<NodeEntity>): Promise<void> {
    this.nodes = TreeNodeOperations.updateNode(this.nodes, nodeId, updates)
    return Promise.resolve()
  }

  async deleteNode(nodeId: string): Promise<void> {
    this.nodes = TreeNodeOperations.deleteNode(this.nodes, nodeId)
    return Promise.resolve()
  }

  async addNode(node: TreeNodeEntity): Promise<void> {
    this.nodes = [...this.nodes, node]
    return Promise.resolve()
  }
}
