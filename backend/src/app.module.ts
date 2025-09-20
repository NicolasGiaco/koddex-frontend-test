import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProjectItemsModule } from "./project-items/project-items.module"
import { ProjectItem } from "./entities/project-item.entity"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      password: "Qwerty123123!",
      username: "nicolas",
      database: "postgres",
      entities: [ProjectItem],
      synchronize: true,
      logging: true,
    }),
    ProjectItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
