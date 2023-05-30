import { Module } from "@nestjs/common";
import { AgentModule } from "./agent/agent.module";
import { BlogModule } from "./blog";
import { CompanyModule } from "./company";
import { CustomerContactRequestModule } from "./customer-contact-request";
import { CustomerPastExperienceModule } from "./customer-past-experience";
import { PropertyModule } from "./property";
import { DeveloperModule } from "./developer";
import { FaqModule } from "./faq";

@Module({
	imports: [
		AgentModule,
		PropertyModule,
		BlogModule,
		CompanyModule,
		CustomerContactRequestModule,
		CustomerPastExperienceModule,
		DeveloperModule,
		FaqModule
	]
})
export class ContentModule {}
