export enum RelationshipType {
  PARENT_CHILD = "parent_child",
  DEPENDENCY = "dependency",
  RELATED = "related",
}

export class Relationship {
  constructor(
    private readonly parentId: string,
    private readonly childId: string,
    private readonly type: RelationshipType = RelationshipType.PARENT_CHILD,
  ) {}

  getParentId(): string {
    return this.parentId
  }

  getChildId(): string {
    return this.childId
  }

  getType(): RelationshipType {
    return this.type
  }

  equals(other: Relationship): boolean {
    return this.parentId === other.parentId && this.childId === other.childId && this.type === other.type
  }

  toString(): string {
    return `Relationship(${this.parentId} -> ${this.childId}, ${this.type})`
  }
}
