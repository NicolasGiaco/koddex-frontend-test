import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import { TreeNodeOperations } from "@/domain/services/tree-node-operations"
import { mockTreeData } from "@/mock/mockData"

interface TreeStore {
  treeData: TreeNodeEntity[]
  searchTerm: string
  expandedSections: {
    localModels: boolean
    projects: boolean
    folders: boolean
  }

  setTreeData: (data: TreeNodeEntity[]) => void
  setSearchTerm: (term: string) => void
  toggleSection: (section: keyof TreeStore["expandedSections"]) => void

  // Repository methods migrated to store
  getAllNodes: () => TreeNodeEntity[]
  saveNodes: (nodes: TreeNodeEntity[]) => void
  findNodeById: (nodeId: string) => TreeNodeEntity | null
  addNode: (node: TreeNodeEntity) => void
  updateNode: (nodeId: string, updates: Partial<TreeNodeEntity["node"]>) => void
  deleteNode: (nodeId: string) => void
  handleDragAndDrop: (activeId: string, overId: string) => void

  getFilteredTree: () => TreeNodeEntity[]
}

export const useTreeStore = create(
  persist<TreeStore, [], []>(
    (set, get) => {
      return {
        // Initial state - initialize with mockData
        treeData: mockTreeData,
        searchTerm: "",
        expandedSections: {
          localModels: true,
          projects: true,
          folders: false,
        },

        setTreeData: data => set({ treeData: data }),
        setSearchTerm: term => set({ searchTerm: term }),
        toggleSection: section =>
          set(state => ({
            expandedSections: {
              ...state.expandedSections,
              [section]: !state.expandedSections[section],
            },
          })),

        // Repository methods migrated from InMemoryTreeRepository
        getAllNodes: () => {
          const { treeData } = get()
          return [...treeData]
        },

        saveNodes: nodes => {
          set({ treeData: [...nodes] })
        },

        findNodeById: nodeId => {
          const { treeData } = get()
          return TreeNodeOperations.findNodeById(treeData, nodeId)
        },

        addNode: node => {
          const { treeData } = get()
          const updatedData = [...treeData, node]
          set({ treeData: updatedData })
        },

        updateNode: (nodeId, updates) => {
          const { treeData } = get()
          const updatedData = TreeNodeOperations.updateNode(treeData, nodeId, updates)
          set({ treeData: updatedData })
        },

        deleteNode: nodeId => {
          const { treeData } = get()
          const updatedData = TreeNodeOperations.deleteNode(treeData, nodeId)
          set({ treeData: updatedData })
        },

        handleDragAndDrop: (activeId, overId) => {
          const { treeData } = get()
          // Simple drag and drop implementation - move node after target
          const { newTree: tempTree, removedNode } = TreeNodeOperations.removeNode(treeData, activeId)
          if (removedNode) {
            const updatedNodes = TreeNodeOperations.insertNode(tempTree, removedNode, overId, "after")
            set({ treeData: updatedNodes })
          }
        },

        getFilteredTree: () => {
          const { treeData, searchTerm } = get()
          return TreeNodeOperations.filterNodes(treeData, searchTerm)
        },
      }
    },
    {
      name: "tree-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
