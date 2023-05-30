import { ECMSContent, ICustomerPastExperience } from "@contracts";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomerPastExperienceService } from "./customer-past-experience.service";

@ApiTags(ECMSContent.CUSTOMER_PAST_EXPERIENCE)
@Controller(`content/${ECMSContent.CUSTOMER_PAST_EXPERIENCE}`)
export class CustomerPastExperienceController {
	constructor(private customerPastExperienceService: CustomerPastExperienceService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<ICustomerPastExperience> {
		return this.customerPastExperienceService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<ICustomerPastExperience>> {
		return this.customerPastExperienceService.getMany();
	}
}
