import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import type { NodeEntity } from "../entities/node"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TreeNodeOperations {
  static findNodeById(treeEntities: TreeNodeEntity[], nodeId: string): TreeNodeEntity | null {
    for (const treeEntity of treeEntities) {
      if (treeEntity.node.id === nodeId) return treeEntity
      if (treeEntity.children) {
        const found = TreeNodeOperations.findNodeById(treeEntity.children, nodeId)
        if (found) return found
      }
    }
    return null
  }

  static updateNode(treeEntities: TreeNodeEntity[], nodeId: string, updates: Partial<NodeEntity>): TreeNodeEntity[] {
    return treeEntities.map(treeNodeEntity => {
      if (treeNodeEntity.node.id === nodeId) {
        const updatedNode = { ...treeNodeEntity.node, ...updates }
        return { ...treeNodeEntity, node: updatedNode }
      }
      if (treeNodeEntity.children) {
        return {
          ...treeNodeEntity,
          children: TreeNodeOperations.updateNode(treeNodeEntity.children, nodeId, updates),
        }
      }
      return treeNodeEntity
    })
  }
  static createNode(nodeData: NodeEntity, children: TreeNodeEntity[] = []): TreeNodeEntity {
    return { node: nodeData, children }
  }
  static deleteNode(treeEntities: TreeNodeEntity[], nodeId: string): TreeNodeEntity[] {
    return treeEntities
      .filter(treeNodeEntity => treeNodeEntity.node.id !== nodeId)
      .map(treeNodeEntity => ({
        ...treeNodeEntity,
        children: treeNodeEntity.children ? TreeNodeOperations.deleteNode(treeNodeEntity.children, nodeId) : [],
      }))
  }

  static removeNode(
    treeEntities: TreeNodeEntity[],
    nodeId: string,
  ): { newTree: TreeNodeEntity[]; removedNode: TreeNodeEntity | null } {
    let removedNode: TreeNodeEntity | null = null

    const newTree = treeEntities
      .filter(treeNodeEntity => {
        if (treeNodeEntity.node.id === nodeId) {
          removedNode = treeNodeEntity
          return false
        }
        return true
      })
      .map(treeNodeEntity => ({
        ...treeNodeEntity,
        children: treeNodeEntity.children ? TreeNodeOperations.removeNode(treeNodeEntity.children, nodeId).newTree : [],
      }))

    return { newTree, removedNode }
  }

  static insertNode(
    treeEntities: TreeNodeEntity[],
    nodeToInsert: TreeNodeEntity,
    targetNodeId: string,
    position: "before" | "after" | "inside",
  ): TreeNodeEntity[] {
    const result: TreeNodeEntity[] = []

    for (const treeNodeEntity of treeEntities) {
      if (treeNodeEntity.node.id === targetNodeId) {
        if (position === "before") {
          result.push(nodeToInsert)
          result.push(treeNodeEntity)
        } else if (position === "after") {
          result.push(treeNodeEntity)
          result.push(nodeToInsert)
        } else if (position === "inside") {
          const updatedChildren = treeNodeEntity.children ? [...treeNodeEntity.children, nodeToInsert] : [nodeToInsert]
          result.push({ ...treeNodeEntity, children: updatedChildren })
        }
      } else {
        result.push(treeNodeEntity)
      }
    }
    return result
  }

  static findNodeAndParent(
    treeEntities: TreeNodeEntity[],
    nodeId: string,
    parent: TreeNodeEntity | null = null,
  ): { node: TreeNodeEntity | null; parent: TreeNodeEntity | null } {
    for (const treeEntity of treeEntities) {
      if (treeEntity.node.id === nodeId) {
        return { node: treeEntity, parent }
      }
      if (treeEntity.children) {
        const result = TreeNodeOperations.findNodeAndParent(treeEntity.children, nodeId, treeEntity)
        if (result.node) {
          return result
        }
      }
    }
    return { node: null, parent: null }
  }

  static filterNodes(treeEntities: TreeNodeEntity[], searchTerm: string): TreeNodeEntity[] {
    const lowerSearchTerm = searchTerm.toLowerCase()

    return treeEntities
      .map(treeNodeEntity => {
        const matches = treeNodeEntity.node.name.toLowerCase().includes(lowerSearchTerm)
        const filteredChildren = treeNodeEntity.children
          ? TreeNodeOperations.filterNodes(treeNodeEntity.children, searchTerm)
          : []

        if (matches || filteredChildren.length > 0) {
          return { ...treeNodeEntity, children: filteredChildren }
        }
        return null
      })
      .filter((item): item is TreeNodeEntity => item !== null)
  }

  static updateNodeChildren(
    treeEntity: TreeNodeEntity,
    parentId: string,
    newChildren: TreeNodeEntity[],
  ): TreeNodeEntity {
    if (treeEntity.node.id === parentId) {
      return { ...treeEntity, children: newChildren }
    }
    if (treeEntity.children) {
      return {
        ...treeEntity,
        children: treeEntity.children.map(child => TreeNodeOperations.updateNodeChildren(child, parentId, newChildren)),
      }
    }
    return treeEntity
  }
}
