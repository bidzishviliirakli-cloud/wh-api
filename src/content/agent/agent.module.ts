import { Module } from "@nestjs/common";

import { StrapiModule } from "@strapi";

import { AgentController } from "./agent.controller";
import { AgentService } from "./agent.service";

@Module({
	imports: [StrapiModule],
	controllers: [AgentController],
	providers: [AgentService]
})
export class AgentModule {}
