export class NodeId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("NodeId cannot be empty")
    }
  }

  getValue(): string {
    return this.value
  }

  equals(other: NodeId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }

  static fromString(value: string): NodeId {
    return new NodeId(value)
  }
}
