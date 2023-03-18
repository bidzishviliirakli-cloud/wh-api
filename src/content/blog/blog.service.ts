import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IBlog } from "@contracts";

@Injectable()
export class BlogService {
	content = ECMSContent.BLOG;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IBlog> {
		return this.strapiService.getContent({ id, content: this.content });
	}

	async getMany(): Promise<Array<IBlog>> {
		return this.strapiService.getContent({ content: this.content });
	}
}
