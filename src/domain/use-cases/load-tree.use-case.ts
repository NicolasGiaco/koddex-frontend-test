import type { NodeRepository } from "../repositories/node-repository"
import type { RelationshipRepository } from "../repositories/relationship-repository"
import type { Tree, TreeService } from "../services/tree-service"

export class LoadTreeUseCase {
  constructor(
    private nodeRepo: NodeRepository,
    private relationshipRepo: RelationshipRepository,
    private treeService: TreeService,
  ) {}

  async execute(): Promise<Tree[]> {
    const nodes = await this.nodeRepo.findAll()
    const relationships = await this.relationshipRepo.findAll()
    return this.treeService.buildTree(nodes, relationships)
  }
}
