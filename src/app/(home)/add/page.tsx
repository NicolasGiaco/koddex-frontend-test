"use client"

import { NodeForm } from "@/components/forms/NodeForm"

export const dynamic = "force-dynamic"

export default function AddNodePage() {
  return (
    <div className="flex justify-center items-start min-h-screen w-full">
      <NodeForm />
    </div>
  )
}
