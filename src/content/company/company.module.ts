import { Module } from "@nestjs/common";
import { StrapiModule } from "@strapi";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

@Module({
	imports: [StrapiModule],
	controllers: [CompanyController],
	providers: [CompanyService]
})
export class CompanyModule {}
