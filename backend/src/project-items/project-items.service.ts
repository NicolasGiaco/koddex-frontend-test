import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { ProjectItem } from "../entities/project-item.entity"

@Injectable()
export class ProjectItemsService {
  constructor(
    @InjectRepository(ProjectItem)
    private projectItemsRepository: Repository<ProjectItem>,
  ) {}

  findAll(): Promise<ProjectItem[]> {
    return this.projectItemsRepository.find()
  }

  findOne(id: number): Promise<ProjectItem | null> {
    return this.projectItemsRepository.findOne({ where: { node_id: id } })
  }

  create(projectItem: Omit<ProjectItem, "node_id">): Promise<ProjectItem> {
    const newProjectItem = this.projectItemsRepository.create(projectItem)
    return this.projectItemsRepository.save(newProjectItem)
  }

  async update(id: number, projectItem: Partial<ProjectItem>): Promise<ProjectItem | null> {
    await this.projectItemsRepository.update(id, projectItem)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.projectItemsRepository.delete(id)
  }

  findByType(type: string): Promise<ProjectItem[]> {
    return this.projectItemsRepository.find({ where: { type } })
  }

  findByStatus(status: string): Promise<ProjectItem[]> {
    return this.projectItemsRepository.find({ where: { status } })
  }

  findByTeam(team: string): Promise<ProjectItem[]> {
    return this.projectItemsRepository.find({ where: { assigned_team: team } })
  }

  findByFramework(framework: string): Promise<ProjectItem[]> {
    return this.projectItemsRepository.find({ where: { framework } })
  }
}
