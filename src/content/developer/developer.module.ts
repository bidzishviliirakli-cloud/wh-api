import { Module } from "@nestjs/common";
import { StrapiModule } from "@strapi";
import { DeveloperController } from "./developer.controller";
import { DeveloperService } from "./developer.service";

@Module({
	imports: [StrapiModule],
	controllers: [DeveloperController],
	providers: [DeveloperService]
})
export class DeveloperModule {}
