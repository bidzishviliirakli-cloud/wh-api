import { ECMSContent, ICompany } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class CompanyService {
	content = ECMSContent.COMPANY;
	//default id for warm house
	id = '1';

	constructor(private strapiService: StrapiService) {}

	async getCompany(): Promise<ICompany> {
		const company = await this.strapiService.getContent({ id: this.id, content: this.content });

		return this.formatCompany(company);
	}

	async getOffices(): Promise<Array<any>> {
		const companies = await this.strapiService.getContent({ content: ECMSContent.COMPANY_OFFICE });

		return companies.map((el) => this.formatOffice(el));
	}

	private formatOffice(office: any): any {
		return {
			id: office?.id,
			title: office?.attributes?.title,
			about: office?.attributes?.about,
			address: office?.attributes?.address,
			phoneNumber: office?.attributes?.phoneNumber,
			gallery: office?.attributes?.gallery?.data?.map( ph => {
				return {
					small: ph.attributes.formats.small.url,
					medium: ph.attributes.formats.medium.url,
					thumbnail: ph.attributes.formats.thumbnail.url,

				}
			}),
			createdAt: office?.attributes?.createdAt,
			publishedAt: office?.attributes?.publishedAt,
			updatedAt: office?.attributes?.updatedAt,
		};
	}

	

	private formatCompany(company: ICompany): any {
		return {
			id: company.id,
			about: company.attributes?.about,
			address: company.attributes?.address,
			ceo: company.attributes?.ceo,
			email: company.attributes?.email,
			phoneNumber: company.attributes?.phoneNumber,
			title: company.attributes?.title,
			createdAt: company.attributes?.createdAt,
			publishedAt: company.attributes?.publishedAt,
			updatedAt: company.attributes?.updatedAt,
		};
	}
}
