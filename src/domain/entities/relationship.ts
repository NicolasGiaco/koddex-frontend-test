import type { NodeId } from "./node-id"

export enum RelationshipType {
  PARENT_CHILD = "parent_child",
  DEPENDENCY = "dependency",
  RELATED = "related",
}

export class Relationship {
  constructor(
    private readonly parentId: NodeId,
    private readonly childId: NodeId,
    private readonly type: RelationshipType = RelationshipType.PARENT_CHILD,
  ) {}

  getParentId(): NodeId {
    return this.parentId
  }

  getChildId(): NodeId {
    return this.childId
  }

  getType(): RelationshipType {
    return this.type
  }

  equals(other: Relationship): boolean {
    return this.parentId.equals(other.parentId) && this.childId.equals(other.childId) && this.type === other.type
  }

  toString(): string {
    return `Relationship(${this.parentId.toString()} -> ${this.childId.toString()}, ${this.type})`
  }
}
