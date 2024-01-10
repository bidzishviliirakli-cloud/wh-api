import { ECMSContent, ICompany } from "@contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";

@ApiTags(ECMSContent.COMPANY)
@Controller(`content/company`)
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get()
	getCompany(): Promise<ICompany> {
		return this.companyService.getCompany();
	}

	@Get("offices")
	getOffices(@Query("locale") locale: string): Promise<Array<any>> {
		return this.companyService.getOffices(locale);
	}
}
