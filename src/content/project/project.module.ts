import { Module } from "@nestjs/common";

import { StrapiModule } from "@strapi";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";



@Module({
	imports: [StrapiModule],
	controllers: [ProjectController],
	providers: [ProjectService],
	exports: [ProjectService]
})
export class ProjectModule {}
