import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import type { ProjectItem } from "../entities/project-item.entity"
import { ProjectItemsService } from "./project-items.service"

@Controller("project-items")
export class ProjectItemsController {
  constructor(private readonly projectItemsService: ProjectItemsService) {}

  @Get()
  findAll(
    @Query("type") type?: string,
    @Query("status") status?: string,
    @Query("team") team?: string,
    @Query("framework") framework?: string,
  ) {
    if (type) {
      return this.projectItemsService.findByType(type)
    }
    if (status) {
      return this.projectItemsService.findByStatus(status)
    }
    if (team) {
      return this.projectItemsService.findByTeam(team)
    }
    if (framework) {
      return this.projectItemsService.findByFramework(framework)
    }
    return this.projectItemsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectItemsService.findOne(+id)
  }

  @Post()
  create(@Body() createProjectItemDto: Omit<ProjectItem, "node_id">) {
    return this.projectItemsService.create(createProjectItemDto)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateProjectItemDto: Partial<ProjectItem>) {
    return this.projectItemsService.update(+id, updateProjectItemDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectItemsService.remove(+id)
  }
}
