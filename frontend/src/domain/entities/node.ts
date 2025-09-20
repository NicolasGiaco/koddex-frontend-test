import type { NodeStatus } from "./node-status"
import type { NodeType } from "./node-type"

export type NodeEntity = {
  id: string
  name: string
  type: NodeType
  status: NodeStatus
  description?: string
  startDate?: Date
  endDate?: Date
}
