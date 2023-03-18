import { ECMSContent, ICompany } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class CompanyService {
	content = ECMSContent.COMPANY;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<ICompany> {
		return this.strapiService.getContent({ id, content: this.content });
	}

	async getMany(): Promise<Array<ICompany>> {
		return this.strapiService.getContent({ content: this.content });
	}
}
