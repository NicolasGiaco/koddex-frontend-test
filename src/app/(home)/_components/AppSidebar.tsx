import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"
import { ThemeToggle } from "../../../components/theme/theme-toggle"
import TaskTreePanel from "./TaskTreePanel"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between flex-row">
        <div className="text-lg font-bold p-4">Koddex Test</div>
        <ThemeToggle />
      </SidebarHeader>
      <SidebarContent>
        <TaskTreePanel />
      </SidebarContent>
    </Sidebar>
  )
}
