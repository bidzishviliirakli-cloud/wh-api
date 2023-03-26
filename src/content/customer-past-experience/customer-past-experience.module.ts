import { Module } from "@nestjs/common";
import { StrapiModule } from "@strapi";
import { CustomerPastExperienceController } from "./customer-past-experience.controller";
import { CustomerPastExperienceService } from "./customer-past-experience.service";

@Module({
	imports: [StrapiModule],
	controllers: [CustomerPastExperienceController],
	providers: [CustomerPastExperienceService]
})
export class CustomerPastExperienceModule {}
