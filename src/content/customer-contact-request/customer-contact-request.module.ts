import { Module } from "@nestjs/common";
import { StrapiModule } from "@strapi";
import { CustomerContactRequestController } from "./customer-contact-request.controller";
import { CustomerContactRequestService } from "./customer-contact-request.service";

@Module({
	imports: [StrapiModule],
	controllers: [CustomerContactRequestController],
	providers: [CustomerContactRequestService]
})
export class CustomerContactRequestModule {}
