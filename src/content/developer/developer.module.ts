import { Module } from "@nestjs/common";
import { StrapiModule } from "@strapi";
import { DeveloperController } from "./developer.controller";
import { DeveloperService } from "./developer.service";
import { ProjectModule } from "../project";

@Module({
	imports: [StrapiModule, ProjectModule],
	controllers: [DeveloperController],
	providers: [DeveloperService]
})
export class DeveloperModule {}
