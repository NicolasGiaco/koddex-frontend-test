import { arrayMove } from "@dnd-kit/sortable"
import type { NodeEntity } from "../entities/node"
import type { TreeNodeEntity } from "../entities/tree-node"
import type { TreeRepository } from "../repositories/tree-repository"
import { TreeNodeOperations } from "../services/tree-node-operations"

export class TreeManagementUseCase {
  constructor(private readonly treeRepository: TreeRepository) {}

  async getFilteredTree(searchTerm: string): Promise<TreeNodeEntity[]> {
    const nodes = await this.treeRepository.getAll()
    return TreeNodeOperations.filterNodes(nodes, searchTerm)
  }

  async handleDragAndDrop(activeId: string, overId: string, nodes: TreeNodeEntity[]): Promise<TreeNodeEntity[]> {
    const activeResult = TreeNodeOperations.findNodeAndParent(nodes, activeId)
    const overResult = TreeNodeOperations.findNodeAndParent(nodes, overId)

    if (!activeResult.node || !overResult.node) {
      return nodes
    }

    // If both nodes are at the same level (siblings)
    if (activeResult.parent === overResult.parent) {
      const siblings = activeResult.parent ? activeResult.parent.children : nodes
      const activeIndex = siblings.findIndex(node => node.node.id === activeId)
      const overIndex = siblings.findIndex(node => node.node.id === overId)

      if (activeIndex !== -1 && overIndex !== -1) {
        const reorderedSiblings = arrayMove(siblings, activeIndex, overIndex)

        if (activeResult.parent) {
          // Update parent's children
          const updatedNodes = nodes.map(node =>
            TreeNodeOperations.updateNodeChildren(node, activeResult.parent?.node.id || "", reorderedSiblings),
          )
          await this.treeRepository.save(updatedNodes)
          return updatedNodes
        } else {
          // Update root level
          await this.treeRepository.save(reorderedSiblings)
          return reorderedSiblings
        }
      }
    } else {
      // Moving between different levels - remove from source and insert at target
      const { newTree, removedNode } = TreeNodeOperations.removeNode(nodes, activeId)
      if (removedNode) {
        const updatedNodes = TreeNodeOperations.insertNode(newTree, removedNode, overId, "after")
        await this.treeRepository.save(updatedNodes)
        return updatedNodes
      }
    }

    return nodes
  }

  async updateNode(nodeId: string, updates: Partial<NodeEntity>): Promise<void> {
    await this.treeRepository.updateNode(nodeId, updates)
  }

  async deleteNode(nodeId: string): Promise<void> {
    await this.treeRepository.deleteNode(nodeId)
  }

  async addNode(node: TreeNodeEntity): Promise<void> {
    await this.treeRepository.addNode(node)
  }

  async findNodeById(nodeId: string): Promise<TreeNodeEntity | null> {
    return await this.treeRepository.findById(nodeId)
  }
}
