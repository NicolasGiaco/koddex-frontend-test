export enum NodeStatus {
  BACKLOG = "Backlog",
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  IN_REVIEW = "In Review",
  DONE = "Done",
}

export namespace NodeStatus {
  export function fromString(status: string): NodeStatus | undefined {
    const normalizedStatus = status.toLowerCase().trim()

    switch (normalizedStatus) {
      case "backlog":
        return NodeStatus.BACKLOG
      case "to do":
        return NodeStatus.TODO
      case "in progress":
        return NodeStatus.IN_PROGRESS
      case "in review":
        return NodeStatus.IN_REVIEW
      case "done":
        return NodeStatus.DONE
      default:
        return undefined
    }
  }
}
