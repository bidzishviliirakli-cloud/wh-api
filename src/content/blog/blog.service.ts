import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IBlog } from "@contracts";

@Injectable()
export class BlogService {
	content = ECMSContent.BLOG;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IBlog> {
		const blog = await this.strapiService.getContent({ id, content: this.content });

		return this.formatBlog(blog);
	}

	async getMany(): Promise<Array<IBlog>> {
		const blogs = await this.strapiService.getContent({ content: this.content });

		return blogs.map((el) => this.formatBlog(el));
	}

	private formatBlog(blog: IBlog): any {
		return {
			id: blog.id,
			title: blog.attributes?.title,
			text: blog.attributes?.text
		};
	}
}
