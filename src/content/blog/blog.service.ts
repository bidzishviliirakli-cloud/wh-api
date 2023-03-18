import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IBlog } from "@contracts";

@Injectable()
export class BlogService {
	content = ECMSContent.BLOG;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IBlog> {
		const data = await this.strapiService.getContent({ id, content: this.content });
		return data;
	}

	async getMany(): Promise<Array<IBlog>> {
		const data = await this.strapiService.getContent({ content: this.content });
		return data;
	}
}
