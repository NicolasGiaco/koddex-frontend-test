import { TreeManagementUseCase } from "@/domain/use-cases/tree-management"
import { InMemoryTreeRepository } from "@/infrastructure/repositories/in-memory-tree-repository"

let treeManagementInstance: TreeManagementUseCase | null = null

export function createTreeManagementUseCase(): TreeManagementUseCase {
  if (!treeManagementInstance) {
    const treeRepository = new InMemoryTreeRepository()
    treeManagementInstance = new TreeManagementUseCase(treeRepository)
  }
  return treeManagementInstance
}
