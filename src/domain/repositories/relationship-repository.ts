import type { NodeId } from "../entities/node-id"
import type { Relationship } from "../entities/relationship"

export interface RelationshipRepository {
  findAll(): Promise<Relationship[]>
  findByChild(childId: NodeId): Promise<Relationship[]>
}
