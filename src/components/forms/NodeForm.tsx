"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { NodeStatus } from "@/domain/entities/node-status"
import { NodeType } from "@/domain/entities/node-type"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import { useTreeStore } from "@/stores/tree-store"

interface NodeFormProps {
  treeNode?: TreeNodeEntity
  isEditing?: boolean
}

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    type: z.enum([NodeType.USER_STORY, NodeType.FEATURE, NodeType.TASK], {}),
    status: z.enum([
      NodeStatus.TODO,
      NodeStatus.IN_PROGRESS,
      NodeStatus.DONE,
      NodeStatus.BACKLOG,
      NodeStatus.IN_REVIEW,
    ]),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    data => {
      if (!data.startDate || !data.endDate) return true
      return new Date(data.endDate) >= new Date(data.startDate)
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    },
  )

type FormValues = z.infer<typeof formSchema>

export function NodeForm({ treeNode, isEditing = false }: NodeFormProps) {
  const router = useRouter()
  const { addNode, updateNode } = useTreeStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: treeNode?.node.name ?? "",
      type: treeNode?.node.type ?? ("" as NodeType),
      status: treeNode?.node.status ?? ("" as NodeStatus),
      description: treeNode?.node.description ?? "",
      startDate: treeNode?.node.startDate
        ? typeof treeNode.node.startDate === "string"
          ? (treeNode.node.startDate as string).split("T")[0]
          : (treeNode.node.startDate as Date).toISOString().split("T")[0]
        : "",
      endDate: treeNode?.node.endDate
        ? typeof treeNode.node.endDate === "string"
          ? (treeNode.node.endDate as string).split("T")[0]
          : (treeNode.node.endDate as Date).toISOString().split("T")[0]
        : "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    const nodeData = {
      id: isEditing ? treeNode?.node.id || "" : `node-${Date.now()}`,
      name: data.name,
      type: data.type,
      status: data.status,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : new Date(),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    }

    try {
      if (isEditing && treeNode) {
        await updateNode(treeNode.node.id, nodeData)
      } else {
        const newNode: TreeNodeEntity = {
          node: nodeData,
          children: [],
        }
        await addNode(newNode)
      }
      router.push("/")
    } catch (error) {
      console.error(`Failed to ${isEditing ? "update" : "add"} node:`, error)
    }
  }

  return (
    <Card className="w-full max-w-3xl h-fit my-24">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit" : "Add a new"}{" "}
          {isEditing ? treeNode?.node.type.toLowerCase() : "user story, feature or task"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="pt-2 p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label className="block mb-1" htmlFor="name">
              Name
            </Label>
            <input {...register("name")} type="text" id="name" className="border rounded px-2 py-1 w-full" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label className="block mb-1" htmlFor="type">
              Type
            </Label>
            <select {...register("type")} id="type" className="border rounded px-2 py-1 w-full">
              <option value="">Select type</option>
              <option value={NodeType.FEATURE}>Feature</option>
              <option value={NodeType.TASK}>Task</option>
              <option value={NodeType.USER_STORY}>User Story</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <Label className="block mb-1" htmlFor="status">
              Status
            </Label>
            <select {...register("status")} id="status" className="border rounded px-2 py-1 w-full">
              <option value="">Select status</option>
              <option value={NodeStatus.BACKLOG}>Backlog</option>
              <option value={NodeStatus.IN_PROGRESS}>In Progress</option>
              <option value={NodeStatus.DONE}>Done</option>
              <option value={NodeStatus.IN_REVIEW}>In Review</option>
              <option value={NodeStatus.TODO}>Todo</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          <div>
            <Label className="block mb-1" htmlFor="description">
              Description
            </Label>
            <textarea {...register("description")} id="description" className="border rounded px-2 py-1 w-full" />
          </div>

          <div>
            <Label className="block mb-1" htmlFor="startDate">
              Start Date
            </Label>
            <input {...register("startDate")} type="date" id="startDate" className="border rounded px-2 py-1 w-full" />
          </div>

          <div>
            <Label className="block mb-1" htmlFor="endDate">
              End Date
            </Label>
            <input {...register("endDate")} type="date" id="endDate" className="border rounded px-2 py-1 w-full" />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
          </div>

          <div className="flex gap-2 justify-center">
            <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {isEditing ? "Update" : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/")} className="px-4 py-2 rounded">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
