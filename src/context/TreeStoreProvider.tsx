// app/(app)/_providers/TreeStoreProvider.tsx
"use client"

import { useRef } from "react"
import type { TreeNodeEntity } from "@/domain/entities/tree-node"
import { useTreeStore } from "@/stores/tree-store"

export function TreeStoreProvider({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData: TreeNodeEntity[]
}) {
  const initialized = useRef(false)

  if (!initialized.current) {
    useTreeStore.setState({
      treeData: initialData,
      // Autres états initiaux si nécessaire
    })
    initialized.current = true
  }

  return <>{children}</>
}
