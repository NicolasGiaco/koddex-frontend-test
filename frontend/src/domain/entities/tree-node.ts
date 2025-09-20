// domain/entities/treeNodeEntity.ts

import type { NodeEntity } from "./node"

export interface TreeNodeEntity {
  node: NodeEntity
  children: TreeNodeEntity[]
}
