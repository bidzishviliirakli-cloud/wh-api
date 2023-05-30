import { ECMSContent, ICompany } from "@contracts";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";

@ApiTags(ECMSContent.COMPANY)
@Controller(`content/${ECMSContent.COMPANY}`)
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<ICompany> {
		return this.companyService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<ICompany>> {
		return this.companyService.getMany();
	}
}
