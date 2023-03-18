import { ECMSContent, ICustomerContactRequest } from "@contracts";
import { ICustomerContactRequestPayloadDTO } from "@dto";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";


@Injectable()
export class CustomerContactRequestService {
	content = ECMSContent.CUSTOMER_CONTACT_REQUEST;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<ICustomerContactRequest> {
		return this.strapiService.getContent({ id, content: this.content });
	}

	async getMany(): Promise<Array<ICustomerContactRequest>> {
		return this.strapiService.getContent({ content: this.content });
	}

	async callMe(data: ICustomerContactRequestPayloadDTO): Promise<ICustomerContactRequest> {
		return this.strapiService.createContent({ content: this.content, data });
	}
}
