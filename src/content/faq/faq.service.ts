import { ECMSContent } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { IFaq } from "@contracts";

@Injectable()
export class FaqService {
	content = ECMSContent.FAQ;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IFaq> {
		const faq = await this.strapiService.getContent({ id, content: this.content });

		return this.formatFaq(faq);
	}

	async getMany(locale: string): Promise<Array<IFaq>> {
		const faqs = await this.strapiService.getContent({ content: this.content, locale });

		return faqs.map((el) => this.formatFaq(el));
	}

	private formatFaq(faq: IFaq): any {
		return {
			id: faq.id,
			answer: faq.attributes?.answer,
			question: faq.attributes?.question,
			createdAt: faq.attributes?.createdAt,
			publishedAt: faq.attributes?.publishedAt,
			updatedAt: faq.attributes?.updatedAt
		};
	}
}
