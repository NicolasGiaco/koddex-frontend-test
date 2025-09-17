import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { mockTreeData } from "@/data/mockData"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import { TreeNodeOperations } from "@/domain/services/tree-node-operations"
import { createTreeManagementUseCase } from "@/factories/tree-factory"

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

  addNode: (node: TreeNodeEntity) => Promise<void>
  updateNode: (nodeId: string, updates: Partial<TreeNodeEntity["node"]>) => Promise<void>
  deleteNode: (nodeId: string) => Promise<void>
  handleDragAndDrop: (activeId: string, overId: string) => Promise<void>

  getFilteredTree: () => TreeNodeEntity[]
}

export const useTreeStore = create(
  persist<TreeStore, [], []>(
    (set, get) => {
      const treeManagementUseCase = createTreeManagementUseCase()

      return {
        // Initial state
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

        addNode: async node => {
          try {
            await treeManagementUseCase.addNode(node)
            const updatedData = await treeManagementUseCase.getFilteredTree("")
            set({ treeData: updatedData })
          } catch (error) {
            console.error("Failed to add node:", error)
            throw error
          }
        },

        updateNode: async (nodeId, updates) => {
          try {
            await treeManagementUseCase.updateNode(nodeId, updates)
            const updatedData = await treeManagementUseCase.getFilteredTree("")
            set({ treeData: updatedData })
          } catch (error) {
            console.error("Failed to update node:", error)
            throw error
          }
        },

        deleteNode: async nodeId => {
          try {
            await treeManagementUseCase.deleteNode(nodeId)
            const updatedData = await treeManagementUseCase.getFilteredTree("")
            set({ treeData: updatedData })
          } catch (error) {
            console.error("Failed to delete node:", error)
            throw error
          }
        },

        handleDragAndDrop: async (activeId, overId) => {
          try {
            const { treeData } = get()
            const updatedNodes = await treeManagementUseCase.handleDragAndDrop(activeId, overId, treeData)
            set({ treeData: updatedNodes })
          } catch (error) {
            console.error("Failed to handle drag and drop:", error)
            throw error
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
