import { ECMSContent, ICustomerPastExperience } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class CustomerPastExperienceService {
	content = ECMSContent.CUSTOMER_PAST_EXPERIENCE;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<ICustomerPastExperience> {
		return this.strapiService.getContent({ id, content: this.content });
	}

	async getMany(): Promise<Array<ICustomerPastExperience>> {
		return this.strapiService.getContent({ content: this.content });
	}
}
