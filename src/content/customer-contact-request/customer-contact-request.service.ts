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

	async getMany(locale: string): Promise<Array<ICustomerContactRequest>> {
		const ccrs = await this.strapiService.getContent({ content: this.content, locale });

		return ccrs.map((el) => this.formatCCR(el));
	}

	async callMe(data: ICustomerContactRequestPayloadDTO): Promise<void> {
		await this.strapiService.createContent({ content: this.content, data });
	}

	private formatCCR(ccr: ICustomerContactRequest): any {
		return {
			id: ccr.id,
			contactDetails: ccr?.attributes?.contactDetails,
			email: ccr?.attributes?.email,
			lastName: ccr?.attributes?.lastName,
			name: ccr?.attributes?.name,
			phoneNumber: ccr?.attributes?.phoneNumber,
			property: {
				id: ccr?.attributes?.property?.data?.id
			},
			project: {
				id: ccr?.attributes?.project?.data?.id
			},
			developer: {
				id: ccr?.attributes?.developer?.data?.id
			},
			createdAt: ccr.attributes?.createdAt,
			publishedAt: ccr.attributes?.publishedAt,
			updatedAt: ccr.attributes?.updatedAt
		};
	}
}
