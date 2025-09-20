import type { Relationship } from "../entities/relationship"

export interface RelationshipRepository {
  findAll(): Promise<Relationship[]>
  findByChild(childId: string): Promise<Relationship[]>
}
