"use server"

import { ThemeToggle } from "@/components/theme/theme-toggle"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import TaskTreePanel from "./TaskTreePanel"

export async function AppSidebar() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  }).then(res => res.json())

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between flex-row">
        <div className="text-lg font-bold p-4">Koddex Test</div>
        <ThemeToggle />
      </SidebarHeader>
      <SidebarContent>
        <TaskTreePanel data={response.data} />
      </SidebarContent>
    </Sidebar>
  )
}
