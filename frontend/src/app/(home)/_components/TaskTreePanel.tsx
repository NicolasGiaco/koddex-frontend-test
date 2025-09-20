"use client"

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ChevronRight, FileText, Folder, Grid3X3, Hash, Plus, Search } from "lucide-react"
import Link from "next/link"
import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import { useTreeStore } from "@/stores/tree-store"
import { TreeNodeOperations } from "../../../domain/services/tree-node-operations"
import { TreeNodeComponent } from "./TreeNode"

export default function TaskTreePanel({ data }: { data: TreeNodeEntity[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const {
    treeData,
    searchTerm,
    expandedSections,
    setSearchTerm,
    toggleSection,
    updateNode,
    deleteNode,
    handleDragAndDrop,
    setTreeData,
  } = useTreeStore()

  React.useEffect(() => {
    if (data && data.length > 0) {
      setTreeData(data)
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Filter tree data based on search
  const filteredTree = useMemo(() => {
    return TreeNodeOperations.filterNodes(treeData, searchTerm)
  }, [treeData, searchTerm])

  const handleDragStart = (event: { active: { id: string | number } }) => {
    setActiveId(String(event.active.id))
  }

  // Get the active node for drag overlay
  const getActiveNode = (nodeId: string): TreeNodeEntity | null => {
    return TreeNodeOperations.findNodeById(treeData, nodeId)
  }

  const handleDragEnd = async (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      setActiveId(null)
      return
    }

    try {
      await handleDragAndDrop(String(active.id), String(over.id))
    } catch (error) {
      console.error("Failed to handle drag and drop:", error)
    }

    setActiveId(null)
  }

  const handleNodeUpdate = async (nodeId: string, updates: Partial<TreeNodeEntity["node"]>) => {
    try {
      await updateNode(nodeId, updates)
    } catch (error) {
      console.error("Failed to update node:", error)
    }
  }

  const handleNodeDelete = async (nodeId: string) => {
    try {
      await deleteNode(nodeId)
    } catch (error) {
      console.error("Failed to delete node:", error)
    }
  }

  return (
    <div className="w-96 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Folder className="w-4 h-4" />
            My organisation
          </h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Projects section */}
        <div className="flex-1">
          <div className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
            <Button
              onClick={() => toggleSection("projects")}
              className="flex items-center gap-2 flex-1"
              variant={"ghost"}
            >
              <ChevronRight
                className={`w-3.5 h-3.5 text-gray-500 transition-transform ${expandedSections.projects ? "rotate-90" : ""}`}
              />
              <span className="text-sm font-medium text-gray-700">Projects</span>
            </Button>

            <Link href="/add">
              <Button variant="ghost" className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </Button>
            </Link>
          </div>

          {expandedSections.projects && (
            <div className="px-2 pb-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={filteredTree.map(n => n.node.id)} strategy={verticalListSortingStrategy}>
                  {filteredTree.map(treeNode => (
                    <TreeNodeComponent
                      key={treeNode.node.id}
                      treeNode={treeNode as TreeNodeEntity}
                      onNodeUpdate={handleNodeUpdate}
                      onNodeDelete={handleNodeDelete}
                    />
                  ))}
                </SortableContext>

                <DragOverlay>
                  {activeId ? (
                    <div className="bg-white shadow-lg rounded-md p-2 opacity-90 border">
                      {(() => {
                        const activeNode = activeId ? getActiveNode(String(activeId)) : null
                        if (activeNode) {
                          const getIcon = () => {
                            if (activeNode.node.type === "Feature") {
                              return <Grid3X3 className="w-4 h-4 text-purple-600" />
                            } else if (activeNode.node.type === "User Story") {
                              return <FileText className="w-4 h-4 text-green-600" />
                            } else {
                              return <Hash className="w-4 h-4 text-blue-600" />
                            }
                          }
                          return (
                            <div className="flex items-center gap-2">
                              {getIcon()}
                              <span className="text-sm font-medium">{activeNode.node.name}</span>
                            </div>
                          )
                        }
                        return <span className="text-sm">Moving item...</span>
                      })()}
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
              {filteredTree.length === 0 && searchTerm && (
                <div className="text-center py-8 text-sm text-gray-500">No results found for "{searchTerm}"</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
