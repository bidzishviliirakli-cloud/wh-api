import { ECMSContent, ICustomerPastExperience } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class CustomerPastExperienceService {
	content = ECMSContent.CUSTOMER_PAST_EXPERIENCE;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<ICustomerPastExperience> {
		const cpe = await this.strapiService.getContent({ id, content: this.content });

		return this.formatCPE(cpe);
	}

	async getMany(): Promise<Array<ICustomerPastExperience>> {
		const cpes = await this.strapiService.getContent({ content: this.content });

		return cpes.map((el) => this.formatCPE(el));
	}

	private formatCPE(cpe: ICustomerPastExperience): any {
		return {
			id: cpe.id,
			title: cpe.attributes?.title,
			stars: cpe.attributes?.stars,
			text: cpe.attributes?.text,
			customerFullName: cpe.attributes?.customerFullName,
			customerImage: {
				large: cpe.attributes?.customerImage?.data?.attributes?.formats?.large?.url,
				medium: cpe.attributes?.customerImage?.data?.attributes?.formats?.medium?.url,
				small: cpe.attributes?.customerImage?.data?.attributes?.formats?.small?.url,
				thumbnail: cpe.attributes?.customerImage?.data?.attributes?.formats?.thumbnail?.url
			},
			createdAt: cpe.attributes?.createdAt,
			publishedAt: cpe.attributes?.publishedAt,
			updatedAt: cpe.attributes?.updatedAt,
		};
	}
}
