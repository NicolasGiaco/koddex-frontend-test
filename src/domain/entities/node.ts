import type { NodeId } from "./node-id"
import type { NodeStatus } from "./node-status"
import type { NodeType } from "./node-type"

export class Node {
  constructor(
    private readonly id: NodeId,
    private name: string,
    private type: NodeType,
    private status: NodeStatus,
    private description?: string,
    private startDate?: Date,
    private endDate?: Date,
  ) {}

  getId(): NodeId {
    return this.id
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  getType(): NodeType {
    return this.type
  }

  setType(type: NodeType): void {
    this.type = type
  }

  getStatus(): NodeStatus {
    return this.status
  }

  setStatus(status: NodeStatus): void {
    this.status = status
  }

  getDescription(): string | undefined {
    return this.description
  }

  setDescription(description: string | undefined): void {
    this.description = description
  }

  getStartDate(): Date | undefined {
    return this.startDate
  }

  setStartDate(startDate: Date | undefined): void {
    this.startDate = startDate
  }

  getEndDate(): Date | undefined {
    return this.endDate
  }

  setEndDate(endDate: Date | undefined): void {
    this.endDate = endDate
  }

  equals(other: Node): boolean {
    return this.id.equals(other.id)
  }

  toString(): string {
    return `Node(${this.id.toString()}, ${this.name}, ${this.type}, ${this.status})`
  }
}
