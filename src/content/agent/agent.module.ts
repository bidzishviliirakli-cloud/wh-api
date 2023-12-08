import { Module } from "@nestjs/common";

import { StrapiModule } from "@strapi";

import { AgentController } from "./agent.controller";
import { AgentService } from "./agent.service";
import { PropertyModule } from "../property";
import { BlogModule } from "../blog";

@Module({
	imports: [StrapiModule, PropertyModule, BlogModule],
	controllers: [AgentController],
	providers: [AgentService]
})
export class AgentModule {}
