import { ECMSContent, ICustomerContactRequest } from "@contracts";
import { ICustomerContactRequestPayloadDTO } from "@dto";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class CustomerContactRequestService {
	content = ECMSContent.CUSTOMER_CONTACT_REQUEST;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<ICustomerContactRequest> {
		const ccr = await this.strapiService.getContent({ id, content: this.content });
		return this.formatCCR(ccr);
	}

	async getMany(): Promise<Array<ICustomerContactRequest>> {
		const ccrs = await this.strapiService.getContent({ content: this.content });

		return ccrs.map((el) => this.formatCCR(el));
	}

	async callMe(data: ICustomerContactRequestPayloadDTO): Promise<ICustomerContactRequest> {
		const ccr = await this.strapiService.createContent({ content: this.content, data });
		return this.formatCCR(ccr);
	}

	private formatCCR(ccr: ICustomerContactRequest): any {
		return {
			id: ccr.id,
			contactDetails: ccr.attributes.contactDetails,
			email: ccr.attributes.email,
			lastName: ccr.attributes.lastName,
			name: ccr.attributes.name,
			phoneNumber: ccr.attributes.phoneNumber,
			property: {
				id: ccr.attributes.property.data.id,
				bedroomQuantity: ccr.attributes.property.data.attributes.bedroomQuantity,
				description: ccr.attributes.property.data.attributes.description,
				pinned: ccr.attributes.property.data.attributes.pinned,
				price: ccr.attributes.property.data.attributes.price,
				size: ccr.attributes.property.data.attributes.size,
				title: ccr.attributes.property.data.attributes.title
			}
		};
	}
}
