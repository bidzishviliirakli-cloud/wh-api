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

	public formatBlog(blog: IBlog): any {
		return {
			id: blog.id,
			title: blog.attributes?.title,
			description: blog.attributes?.description,
			header1: blog.attributes?.header1,
			header2: blog.attributes?.header2,
			header3: blog.attributes?.header3,
			header4: blog.attributes?.header4,
			header5: blog.attributes?.header5,
			header6: blog.attributes?.header6,
			text1: blog.attributes?.text1,
			text2: blog.attributes?.text2,
			text3: blog.attributes?.text3,
			text4: blog.attributes?.text4,
			text5: blog.attributes?.text5,
			text6: blog.attributes?.text6,
			cover: {
				large: blog.attributes?.cover?.data?.attributes?.formats?.large?.url,
				medium: blog.attributes?.cover?.data?.attributes?.formats?.medium?.url,
				small: blog.attributes?.cover?.data?.attributes?.formats?.small?.url,
				thumbnail: blog.attributes?.cover?.data?.attributes?.formats?.thumbnail?.url,
				url: blog.attributes?.cover?.data?.attributes?.url
			},
			gallery: blog.attributes?.gallery?.data?.map( el => {
				const formated= {
					large: el.attributes?.formats?.large?.url,
					medium: el.attributes?.formats?.medium?.url,
					small: el.attributes?.formats?.small?.url,
					thumbnail: el.attributes?.formats?.thumbnail?.url,
					url: el.attributes?.url
				}
				return formated;
			}),
			agent: blog.attributes?.agent?.data?.id,
			createdAt: blog.attributes?.createdAt,
			publishedAt: blog.attributes?.publishedAt,
			updatedAt: blog.attributes?.updatedAt,
		}
	}
}
