# Technical Test: Interactive Decision Tree Challenge

## Objective

The objective of this technical test is to evaluate the candidate's advanced problem-solving skills, front-end optimization strategies, and proficiency in building highly responsive UIs.  
The candidate will work on parsing complex data and implementing an interactive, high-performance application using React and Next.js.

## Exercise

### Step 1: Implementation

You will be provided with three CSV files containing data about a multi-level task tree, including nodes and their relationships.  
Your task is to create a front-end application that parses these files and displays the data in a highly interactive tree structure.

#### Task Details:

- **Functionality**:
  - **Data Parsing**: Load and parse the provided CSV files (`nodes.csv`, `relationships.csv`).
  - **Tree Display**: Display a task tree where each node can represent a feature, user story, or a task.
  - **Node Interactions**: Allow nodes to be expanded, collapsed, and rearranged in real time based on user actions.
  - **Simple CRUD**: Allow to add/edit/delete each node from the tree, and from the visualisation.
  - **Metadata**: Show additional metadata (from `nodes.csv`) for each node when expanded.

- **Reactivity Requirements**:
  - Ensure the tree updates dynamically as nodes or properties change.
  - The updates should propagate efficiently to dependent nodes.
  - Any node manipulation should be reflected instantly in the UI with minimal re-rendering.

#### Implementation Guidelines:

- **Keep It Simple, Make It Work**: Focus on delivering a functional and responsive application within the provided constraints.
- **Work Independently**: Minimal guidance will be given; you should be prepared to make tasks on architecture and approach.
- **Use Next.js**: Utilize its SSR or ISR features if needed, and optimize client-side rendering for dynamic updates.

### Step 2: Optimization and Discussion

Assume that the dataset scales up to a size with hundreds of thousands of nodes and relationships.  
Discuss how you would optimize your implementation to handle this increased scale without sacrificing responsiveness.

#### Discussion Points:

- **Complexity Analysis**: Analyze the complexity of your current implementation with the initial dataset.
- **Optimization Proposals**: 
  - Propose strategies for handling larger datasets (e.g., pagination, virtualization).
  - Evaluate the complexity and latency of your proposed solutions.
  - Discuss real-time update strategies, including WebSocket or streaming-based solutions for high-frequency updates.

## Evaluation Criteria

### Understanding and Communication (2 points)

- Demonstrates a deep understanding of the problem and its complexities.
- Effectively communicates the approach and reasoning behind key tasks.

### Step 1: Implementation (6 points)

- **Functionality (2 points)**: The application meets the requirements.
- **Reactivity (2 points)**: The implementation ensures high responsiveness with minimal re-renders.
- **Quality (2 points)**: Code quality, readability, maintainability, and effective use of state management.

### Step 2: Optimization and Discussion (4 points)

- **Scalability Proposals (2 points)**: Proposes efficient strategies for scaling the solution.
- **Complexity Analysis and Real-Time Solution (2 points)**: Comfortably discusses complexity and viable solutions for real-time updates with large datasets.
