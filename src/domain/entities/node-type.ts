export enum NodeType {
  FEATURE = "Feature",
  USER_STORY = "User Story",
  TASK = "Task",
}

export namespace NodeType {
  export function fromString(value: string): NodeType | undefined {
    const normalizedValue = value.toLowerCase().trim()

    switch (normalizedValue) {
      case "feature":
        return NodeType.FEATURE
      case "user story":
        return NodeType.USER_STORY
      case "task":
        return NodeType.TASK
      default:
        return undefined
    }
  }
}
