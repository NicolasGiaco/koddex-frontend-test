"use client"

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ChevronDown, ChevronRight, Edit, FileText, Grid3X3, Hash, Trash2 } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"

interface TreeNodeComponentProps {
  treeNode: TreeNodeEntity
  level?: number
  onNodeUpdate: (nodeId: string, updates: Partial<TreeNodeEntity["node"]>) => void
  onNodeDelete: (nodeId: string) => void
}

export const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  treeNode,
  level = 0,
  onNodeUpdate,
  onNodeDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(treeNode.node.name)
  const hasChildren = treeNode.children && treeNode.children.length > 0

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: treeNode.node.id,
    data: { treeNode },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getIcon = () => {
    const type = treeNode.node.type
    if (type === "Feature") {
      return <Grid3X3 className="w-4 h-4" />
    } else if (type === "User Story") {
      return <FileText className="w-4 h-4" />
    } else {
      return <Hash className="w-4 h-4" />
    }
  }

  const getTypeColor = () => {
    switch (treeNode.node.type) {
      case "Feature":
        return "text-purple-600"
      case "User Story":
        return "text-green-600"
      case "Task":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = () => {
    const statusColors = {
      Done: "bg-green-100 text-green-800",
      "In Progress": "bg-blue-100 text-blue-800",
      "To Do": "bg-yellow-100 text-yellow-800",
      "In Review": "bg-orange-100 text-orange-800",
      Backlog: "bg-gray-100 text-gray-800",
    }

    return (
      <span
        className={`px-2 py-0.5 text-xs rounded-full ${statusColors[treeNode.node.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
      >
        {treeNode.node.status}
      </span>
    )
  }

  const handleSave = () => {
    onNodeUpdate(treeNode.node.id, { name: editName })
    setIsEditing(false)
  }

  return (
    <div ref={setNodeRef} style={style} className="">
      <div
        className={`group/item flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors ${isDragging ? "bg-gray-100" : ""}`}
        style={{ paddingLeft: `${level * 24 + 8}px` }}
      >
        <div className="flex items-center gap-1.5 flex-1" {...attributes} {...listeners}>
          {hasChildren && (
            <Button
              onClick={e => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="p-0.5 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </Button>
          )}
          {!hasChildren && <div className="w-5" />}

          <div className={`${getTypeColor()} flex-shrink-0`}>{getIcon()}</div>

          {isEditing ? (
            <Input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={e => {
                e.stopPropagation()
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") {
                  setEditName(treeNode.node.name)
                  setIsEditing(false)
                }
              }}
              className="dark:bg-slate-800 flex-1 px-2 py-0.5 border border-blue-400 rounded text-sm outline-none focus:border-blue-500 bg-white"
              autoFocus
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className="flex-1 text-sm dark:text-white text-gray-900 font-medium select-none">
              {treeNode.node.name}
            </span>
          )}

          {getStatusBadge()}
        </div>

        <div className="opacity-0 group-hover/item:opacity-100 flex gap-0.5 transition-opacity">
          <Link href={`/${treeNode.node.id}`}>
            <Button className="p-1 hover:bg-gray-200 rounded transition-colors" onClick={e => e.stopPropagation()}>
              <Edit className="w-3.5 h-3.5 text-gray-500" />
            </Button>
          </Link>
          <Button
            className="p-1 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
            onClick={e => {
              e.stopPropagation()
              if (confirm(`Delete "${treeNode.node.name}"?`)) {
                onNodeDelete(treeNode.node.id)
              }
            }}
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-500" />
          </Button>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <SortableContext items={treeNode.children.map(c => c.node.id)} strategy={verticalListSortingStrategy}>
          <div>
            {treeNode.children.map(child => (
              <TreeNodeComponent
                key={child.node.id}
                treeNode={child}
                level={level + 1}
                onNodeUpdate={onNodeUpdate}
                onNodeDelete={onNodeDelete}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  )
}
