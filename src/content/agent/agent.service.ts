import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { IAgent, ECMSContent, IProperty, IBlog } from "@contracts";
import { Util } from "@util";

@Injectable()
export class AgentService {
	content = ECMSContent.AGENT;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IAgent> {
		const agent = await this.strapiService.getContent({ id, content: this.content });
		const formatedAgent = await this.formatAgent(agent, true);

		return formatedAgent;
	}

	async getMany(locale: string): Promise<Array<IAgent>> {
		const agents = await this.strapiService.getContent({ content: this.content, locale });
		const formatedAgents = [];

		for (let i = 0; i < agents.length; i++) {
			formatedAgents.push(await this.formatAgent(agents[i], false));
		}

		return formatedAgents;
	}

	public async formatAgent(agent: IAgent, detailed: boolean): Promise<any> {
		const { properties, blogs } = await this.getDetailedInfo(agent, detailed);

		return {
			id: agent.id,
			about: agent.attributes?.about,
			email: agent.attributes?.email,
			name: agent.attributes?.name,
			status: agent.attributes?.status,
			lastName: agent.attributes?.lastName,
			phoneNumber: agent.attributes?.phoneNumber,
			profilePicture: {
				large: agent.attributes?.profilePicture?.data?.attributes?.formats?.large?.url,
				medium: agent.attributes?.profilePicture?.data?.attributes?.formats?.medium?.url,
				small: agent.attributes?.profilePicture?.data?.attributes?.formats?.small?.url,
				thumbnail: agent.attributes?.profilePicture?.data?.attributes?.formats?.thumbnail?.url,
				url: agent.attributes?.profilePicture?.data?.attributes?.url
			},
			properties,
			blogs,
			createdAt: agent.attributes?.createdAt,
			publishedAt: agent.attributes?.publishedAt,
			updatedAt: agent.attributes?.updatedAt
		};
	}

	private async getDetailedInfo(agent: IAgent, detailed: boolean): Promise<any> {
		let properties = []; 
		let blogs = [];

		if(!detailed){
			return { properties, blogs }
		}

		properties = await this.strapiService.getContent({
			filter: `filters[agent][id][$eq]=${agent.id}`,
			content: ECMSContent.PROPERTY
		});

		blogs = await this.strapiService.getContent({
			filter: `filters[agent][id][$eq]=${agent.id}`,
			content: ECMSContent.BLOG
		});

		return { properties: properties.map( property => this.formatProperty( property )), blogs: blogs.map( blog => this.formatBlog(blog)) };
	}

	private formatProperty(property: IProperty) {
		return {
			id: property.id,
			streetAddress: property.attributes?.streetAddress,
			bedRoomQuantity: property.attributes?.bedroomQuantity,
			dealType: property.attributes?.dealType?.data?.attributes?.title,
			description: property.attributes?.description,
			aboutProperty: property.attributes?.aboutProperty,
			parking: property.attributes?.parking,
			bathroom: property.attributes?.bathroom,
			developer: {
				title: property.attributes?.developer?.data?.attributes?.title,
				ceo: property.attributes?.developer?.data?.attributes?.ceo
			},
			gallery: property.attributes?.gallery?.data?.map((el) => {
				const formats = el.attributes?.formats;

				return {
					large: formats?.large?.url,
					medium: formats?.medium?.url,
					small: formats?.small?.url,
					thumbnail: formats?.thumbnail?.url,
					url: el.attributes.url
				};
			}),
			pinned: property.attributes?.pinned,
			amenities: property.attributes?.propertyAmenities?.data?.map((el) => {
				const title = el?.attributes?.title;
				const svg = el?.attributes?.title;

				return { title, svg };
			}),
			category: property.attributes?.propertyCategory?.data?.attributes?.title,
			city: property.attributes?.city?.data?.attributes?.name,
			district: property.attributes?.district?.data?.attributes?.name,
			size: property.attributes?.size,
			title: property.attributes?.title,
			price: {
				usd: Util.convertGelToUsd(property.attributes.price)?.toLocaleString("en-US"),
				gel: property.attributes?.price?.toLocaleString("ge-GE")
			},
			createdAt: property.attributes?.createdAt,
			publishedAt: property.attributes?.publishedAt,
			updatedAt: property.attributes?.updatedAt
		};
	}

	private formatBlog(blog: IBlog) {
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
			gallery: blog.attributes?.gallery?.data?.map((el) => {
				const formated = {
					large: el.attributes?.formats?.large?.url,
					medium: el.attributes?.formats?.medium?.url,
					small: el.attributes?.formats?.small?.url,
					thumbnail: el.attributes?.formats?.thumbnail?.url,
					url: el.attributes?.url
				};
				return formated;
			}),
			createdAt: blog.attributes?.createdAt,
			publishedAt: blog.attributes?.publishedAt,
			updatedAt: blog.attributes?.updatedAt
		};
	}
}
