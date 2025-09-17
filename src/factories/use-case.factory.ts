import { TreeService } from "@/domain/services/tree-service"
import { LoadTreeUseCase } from "@/domain/use-cases/load-tree.use-case"
import { NodeRepositoryImpl } from "../infrastructure/repositories/node-repository-impl"
import { RelationshipRepositoryImpl } from "../infrastructure/repositories/relationship-repository-impl"

export function createLoadTreeUseCase(): LoadTreeUseCase {
  const nodeRepo = new NodeRepositoryImpl()
  const relationshipRepo = new RelationshipRepositoryImpl()
  const treeService = new TreeService(nodeRepo, relationshipRepo)

  return new LoadTreeUseCase(nodeRepo, relationshipRepo, treeService)
}
