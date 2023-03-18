import { Module } from "@nestjs/common";
import { AgentModule } from "./agent/agent.module";
import { BlogModule } from "./blog";
import { CompanyModule } from "./company";
import { CustomerContactRequestModule } from "./customer-contact-request";
import { PropertyModule } from "./property";

@Module({
	imports: [AgentModule, PropertyModule, BlogModule, CompanyModule, CustomerContactRequestModule]
})
export class ContentModule {}
