import { ECMSContent, ICompany } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class AboutService {
	content = ECMSContent.ABOUT;

	constructor(private strapiService: StrapiService) {}

	async getOne(locale: string): Promise<ICompany> {
		const about = await this.strapiService.getContent({ content: this.content, locale });

		return this.formatAbout(about);
	}

	//TODO: fix types
	private formatAbout(about: any): any {
		return {
			id: about.id,
			header: about.attributes?.Header,
			descriptionFirst: about.attributes?.descriptionFirst,
			descriptionSecond: about.attributes?.descriptionSecond,
			customerSatisfaction: about.attributes?.customerSatisfaction,
			inPropertySales: about.attributes?.inPropertySales,
			succesfulSales: about.attributes?.succesfulSales,
			customerSatisfactionDescription: about.attributes?.customerSatisfactionDescription,
			inPropertySalesDescription: about.attributes?.inPropertySalesDescription,
			succesfullSalesDescription: about.attributes?.succesfullSalesDescription,
			goalHeader: about.attributes?.goalHeader,
			helpHeader: about.attributes?.helpHeader,
			goalDescription: about.attributes?.goalDescription,
			helpDescription: about.attributes?.helpDescription,
			happyClients: about.attributes?.happyClients,
			agentsHeader: about.attributes?.agentsHeader,
			agentsDescription: about.attributes?.agentsDescription,
			valuesHeader: about.attributes?.valuesHeader,
			valuesDescription: about.attributes?.valuesDescription,
			excelenceDescription: about.attributes?.excelenceDescription,
			qualityDescription: about.attributes?.qualityDescription,
			achivementDescription: about.attributes?.achivementDescription,
			transparencyDescription: about.attributes?.transparencyDescription,
			accesibilityDescription: about.attributes?.accesibilityDescription,
			officesHeader: about.attributes?.officesHeader,
			officesDescription: about.attributes?.officesDescription,
			companyOffices: about.attributes?.company_offices?.data?.map((office) => {
				const data = {
					title: office?.attributes?.title,
					about: office?.attributes?.about,
					address: office?.attributes?.address,
					phone: office?.attributes?.phoneNumber
				};

				return data;
			}),
			gallery: about.attributes?.gallery?.data?.map((photo) => {
				const data = {
					large: photo.attributes?.formats?.large?.url,
					medium: photo.attributes?.formats?.medium?.url,
					small: photo.attributes?.formats?.small?.url,
					thumbnail: photo.attributes?.formats?.thumbnail?.url
				};

				return data;
			}),
			createdAt: about.attributes?.createdAt,
			publishedAt: about.attributes?.publishedAt,
			updatedAt: about.attributes?.updatedAt
		};
	}
}
