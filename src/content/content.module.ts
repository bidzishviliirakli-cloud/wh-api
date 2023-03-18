import { Module } from "@nestjs/common";
import { AgentModule } from "./agent/agent.module";
import { BlogModule } from "./blog";
import { PropertyModule } from "./property";

@Module({
	imports: [AgentModule, PropertyModule, BlogModule]
})
export class ContentModule {}
