// Types matching the data structure
export interface NodeData {
  id: { value: string }
  name: string
  type: "Feature" | "User Story" | "Task"
  status: string
  description: string
  startDate: string
  endDate: string
}

export interface TreeNode {
  node: NodeData
  children: TreeNode[]
}

export const mockTreeData: TreeNode[] = [
  {
    node: {
      id: { value: "1" },
      name: "Feature 1",
      type: "Feature",
      status: "Done",
      description: "Description of Feature 1",
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2024-01-16T00:00:00.000Z",
    },
    children: [],
  },
  {
    node: {
      id: { value: "2" },
      name: "Feature 2",
      type: "Feature",
      status: "In Review",
      description: "Description of Feature 2",
      startDate: "2024-01-02T00:00:00.000Z",
      endDate: "2024-01-17T00:00:00.000Z",
    },
    children: [
      {
        node: {
          id: { value: "16" },
          name: "User Story 16",
          type: "User Story",
          status: "In Review",
          description: "Description of User Story 16",
          startDate: "2024-01-16T00:00:00.000Z",
          endDate: "2024-01-31T00:00:00.000Z",
        },
        children: [
          {
            node: {
              id: { value: "60" },
              name: "Task 60",
              type: "Task",
              status: "To Do",
              description: "Description of Task 60",
              startDate: "2024-02-29T00:00:00.000Z",
              endDate: "2024-03-15T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "78" },
              name: "Task 78",
              type: "Task",
              status: "In Progress",
              description: "Description of Task 78",
              startDate: "2024-03-18T00:00:00.000Z",
              endDate: "2024-04-02T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "96" },
              name: "Task 96",
              type: "Task",
              status: "In Progress",
              description: "Description of Task 96",
              startDate: "2024-04-05T00:00:00.000Z",
              endDate: "2024-04-20T00:00:00.000Z",
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    node: {
      id: { value: "3" },
      name: "Feature 3",
      type: "Feature",
      status: "In Review",
      description: "Description of Feature 3",
      startDate: "2024-01-03T00:00:00.000Z",
      endDate: "2024-01-18T00:00:00.000Z",
    },
    children: [
      {
        node: {
          id: { value: "24" },
          name: "User Story 24",
          type: "User Story",
          status: "To Do",
          description: "Description of User Story 24",
          startDate: "2024-01-24T00:00:00.000Z",
          endDate: "2024-02-08T00:00:00.000Z",
        },
        children: [
          {
            node: {
              id: { value: "49" },
              name: "Task 49",
              type: "Task",
              status: "Backlog",
              description: "Description of Task 49",
              startDate: "2024-02-18T00:00:00.000Z",
              endDate: "2024-03-04T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "69" },
              name: "Task 69",
              type: "Task",
              status: "To Do",
              description: "Description of Task 69",
              startDate: "2024-03-09T00:00:00.000Z",
              endDate: "2024-03-24T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "71" },
              name: "Task 71",
              type: "Task",
              status: "In Progress",
              description: "Description of Task 71",
              startDate: "2024-03-11T00:00:00.000Z",
              endDate: "2024-03-26T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "76" },
              name: "Task 76",
              type: "Task",
              status: "Backlog",
              description: "Description of Task 76",
              startDate: "2024-03-16T00:00:00.000Z",
              endDate: "2024-03-31T00:00:00.000Z",
            },
            children: [],
          },
        ],
      },
      {
        node: {
          id: { value: "26" },
          name: "User Story 26",
          type: "User Story",
          status: "Done",
          description: "Description of User Story 26",
          startDate: "2024-01-26T00:00:00.000Z",
          endDate: "2024-02-10T00:00:00.000Z",
        },
        children: [
          {
            node: {
              id: { value: "59" },
              name: "Task 59",
              type: "Task",
              status: "To Do",
              description: "Description of Task 59",
              startDate: "2024-02-28T00:00:00.000Z",
              endDate: "2024-03-14T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "63" },
              name: "Task 63",
              type: "Task",
              status: "To Do",
              description: "Description of Task 63",
              startDate: "2024-03-03T00:00:00.000Z",
              endDate: "2024-03-18T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "70" },
              name: "Task 70",
              type: "Task",
              status: "In Review",
              description: "Description of Task 70",
              startDate: "2024-03-10T00:00:00.000Z",
              endDate: "2024-03-25T00:00:00.000Z",
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    node: {
      id: { value: "4" },
      name: "Feature 4",
      type: "Feature",
      status: "Backlog",
      description: "Description of Feature 4",
      startDate: "2024-01-04T00:00:00.000Z",
      endDate: "2024-01-19T00:00:00.000Z",
    },
    children: [
      {
        node: {
          id: { value: "45" },
          name: "User Story 45",
          type: "User Story",
          status: "In Review",
          description: "Description of User Story 45",
          startDate: "2024-02-14T00:00:00.000Z",
          endDate: "2024-02-29T00:00:00.000Z",
        },
        children: [
          {
            node: {
              id: { value: "47" },
              name: "Task 47",
              type: "Task",
              status: "In Review",
              description: "Description of Task 47",
              startDate: "2024-02-16T00:00:00.000Z",
              endDate: "2024-03-02T00:00:00.000Z",
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    node: {
      id: { value: "5" },
      name: "Feature 5",
      type: "Feature",
      status: "In Progress",
      description: "Description of Feature 5",
      startDate: "2024-01-05T00:00:00.000Z",
      endDate: "2024-01-20T00:00:00.000Z",
    },
    children: [
      {
        node: {
          id: { value: "30" },
          name: "User Story 30",
          type: "User Story",
          status: "Done",
          description: "Description of User Story 30",
          startDate: "2024-01-30T00:00:00.000Z",
          endDate: "2024-02-14T00:00:00.000Z",
        },
        children: [
          {
            node: {
              id: { value: "51" },
              name: "Task 51",
              type: "Task",
              status: "Backlog",
              description: "Description of Task 51",
              startDate: "2024-02-20T00:00:00.000Z",
              endDate: "2024-03-06T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "54" },
              name: "Task 54",
              type: "Task",
              status: "In Progress",
              description: "Description of Task 54",
              startDate: "2024-02-23T00:00:00.000Z",
              endDate: "2024-03-09T00:00:00.000Z",
            },
            children: [],
          },
          {
            node: {
              id: { value: "94" },
              name: "Task 94",
              type: "Task",
              status: "Done",
              description: "Description of Task 94",
              startDate: "2024-04-03T00:00:00.000Z",
              endDate: "2024-04-18T00:00:00.000Z",
            },
            children: [],
          },
        ],
      },
      {
        node: {
          id: { value: "42" },
          name: "User Story 42",
          type: "User Story",
          status: "In Review",
          description: "Description of User Story 42",
          startDate: "2024-02-11T00:00:00.000Z",
          endDate: "2024-02-26T00:00:00.000Z",
        },
        children: [
          {
            node: {
              id: { value: "46" },
              name: "Task 46",
              type: "Task",
              status: "In Progress",
              description: "Description of Task 46",
              startDate: "2024-02-15T00:00:00.000Z",
              endDate: "2024-03-01T00:00:00.000Z",
            },
            children: [],
          },
        ],
      },
    ],
  },
]
