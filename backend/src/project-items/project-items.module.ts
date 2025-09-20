import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProjectItem } from "../entities/project-item.entity"
import { ProjectItemsController } from "./project-items.controller"
import { ProjectItemsService } from "./project-items.service"

@Module({
  imports: [TypeOrmModule.forFeature([ProjectItem])],
  controllers: [ProjectItemsController],
  providers: [ProjectItemsService],
  exports: [ProjectItemsService],
})
export class ProjectItemsModule {}
