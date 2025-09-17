"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { NodeForm } from "@/components/forms/NodeForm"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import { TreeNodeOperations } from "@/domain/services/tree-node-operations"
import { useTreeStore } from "@/stores/tree-store"

export default function EditNodePage() {
  const params = useParams()
  const { treeData } = useTreeStore()
  const [node, setNode] = useState<TreeNodeEntity | null>(null)
  const [loading, setLoading] = useState(true)

  console.log(treeData)
  console.log(node)
  useEffect(() => {
    if (params.id && treeData.length > 0) {
      const foundTreeNode = TreeNodeOperations.findNodeById(treeData, params.id as string)
      console.log(foundTreeNode)
      setNode(foundTreeNode)
      setLoading(false)
    }
  }, [params.id, treeData])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!node) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Node not found</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-start min-h-screen w-full">
      <NodeForm treeNode={node} isEditing={true} />
    </div>
  )
}
