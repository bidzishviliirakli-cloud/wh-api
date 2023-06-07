import { ECMSContent, ICompany } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class CompanyService {
	content = ECMSContent.COMPANY;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<ICompany> {
		const company = await this.strapiService.getContent({ id, content: this.content });

		return this.formatCompany(company);
	}

	async getMany(): Promise<Array<ICompany>> {
		const companies = await this.strapiService.getContent({ content: this.content });

		return companies.map((el) => this.formatCompany(el));
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
