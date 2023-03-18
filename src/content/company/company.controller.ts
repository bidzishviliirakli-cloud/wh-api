import { Controller, Get, Param } from "@nestjs/common";
import { CompanyService } from "./company.service";

@Controller("company")
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<any> {
		return this.companyService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<any>> {
		return this.companyService.getMany();
	}
}
