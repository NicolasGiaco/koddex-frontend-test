import type { NodeEntity } from "../entities/node"
import type { Relationship } from "../entities/relationship"
import type { NodeRepository } from "../repositories/node-repository"
import type { RelationshipRepository } from "../repositories/relationship-repository"

export interface Tree {
  node: NodeEntity
  children: Tree[]
  parent?: Tree
}

export class TreeService {
  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly relationshipRepository: RelationshipRepository,
  ) {}

  async buildTree(nodes: NodeEntity[], relationships: Relationship[]): Promise<Tree[]> {
    const rootNodes = this.findRootNodes(nodes, relationships)
    return Promise.all(rootNodes.map(node => this.buildTreeFromNode(node, nodes, relationships)))
  }

  async getNodeWithChildren(nodeId: string): Promise<Tree | null> {
    const node = await this.nodeRepository.findById(nodeId)
    if (!node) {
      return null
    }

    const allNodes = await this.nodeRepository.findAll()
    const allRelationships = await this.relationshipRepository.findAll()

    return this.buildTreeFromNode(node, allNodes, allRelationships)
  }

  async getNodePath(nodeId: string): Promise<NodeEntity[]> {
    const path: NodeEntity[] = []
    let currentNodeId: string | null = nodeId

    while (currentNodeId) {
      const node = await this.nodeRepository.findById(currentNodeId)
      if (!node) {
        break
      }

      path.unshift(node)

      const parentRelationships = await this.relationshipRepository.findByChild(currentNodeId)
      currentNodeId = parentRelationships.length > 0 ? parentRelationships[0].getParentId() : null
    }

    return path
  }

  async getNodeDepth(nodeId: string): Promise<number> {
    const path = await this.getNodePath(nodeId)
    return path.length - 1
  }

  async getTreeStats(): Promise<{
    totalNodes: number
    totalRelationships: number
    maxDepth: number
    rootNodes: number
  }> {
    const allNodes = await this.nodeRepository.findAll()
    const allRelationships = await this.relationshipRepository.findAll()

    const rootNodes = this.findRootNodes(allNodes, allRelationships)

    let maxDepth = 0
    for (const node of allNodes) {
      const depth = await this.getNodeDepth(node.id)
      maxDepth = Math.max(maxDepth, depth)
    }

    return {
      totalNodes: allNodes.length,
      totalRelationships: allRelationships.length,
      maxDepth,
      rootNodes: rootNodes.length,
    }
  }

  private async buildTreeFromNode(
    node: NodeEntity,
    allNodes: NodeEntity[],
    allRelationships: Relationship[],
  ): Promise<Tree> {
    const childRelationships = allRelationships.filter(rel => rel.getParentId() === node.id)

    const children = await Promise.all(
      childRelationships.map(async rel => {
        const childNode = allNodes.find(n => n.id === rel.getChildId())

        if (!childNode) {
          throw new Error(`Child node with id ${rel.getChildId().toString()} not found`)
        }
        return this.buildTreeFromNode(childNode, allNodes, allRelationships)
      }),
    )

    return {
      node,
      children,
    }
  }

  private findRootNodes(nodes: NodeEntity[], relationships: Relationship[]): NodeEntity[] {
    const childNodeIds = new Set(relationships.map(rel => rel.getChildId().toString()))

    return nodes.filter(node => !childNodeIds.has(node.id.toString()))
  }
}
