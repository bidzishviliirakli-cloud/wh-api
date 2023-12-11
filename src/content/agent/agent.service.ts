import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { IAgent, ECMSContent } from "@contracts";
import { PropertyService } from "../property";
import { BlogService } from "../blog";

@Injectable()
export class AgentService {
	content = ECMSContent.AGENT;

	constructor(private strapiService: StrapiService, private propertyService: PropertyService, private blogService: BlogService) {}

	async getOne(id: string): Promise<IAgent> {
		const agent = await this.strapiService.getContent({ id, content: this.content });
		const formatedAgent = await this.formatAgent(agent, true);

		return formatedAgent;
	}

	async getMany(): Promise<Array<IAgent>> {
		const agents = await this.strapiService.getContent({ content: this.content });
		const formatedAgents = [];

		for(let i =0 ; i< agents.length ; i++){
			formatedAgents.push(await this.formatAgent(agents[i], false));
		}


		return formatedAgents;
	}

	private async formatAgent(agent: IAgent, detailed: boolean):  Promise<any> {
		const { properties, blogs } = await this.getDetailedInfo(agent,detailed);

		return {
			id: agent.id,
			about: agent.attributes?.about,
			email: agent.attributes?.email,
			name: agent.attributes?.name,
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
			updatedAt: agent.attributes?.updatedAt,

		};
	}

	private async getDetailedInfo(agent: IAgent, detailed: boolean): Promise<any>{
		if(!detailed){
			return { properties: agent.attributes.properties, blogs: agent.attributes.blogs }
		}

		const propertyIds = agent.attributes?.properties?.data;
		const properties = [];
		const blogIds = agent.attributes?.blogs?.data;
		const blogs = [];

		for(let i = 0; i < propertyIds.length; i++ ){
			const property = await this.strapiService.getContent({  id: propertyIds[i].id.toString() , content: ECMSContent.PROPERTY});
			properties.push(this.propertyService.formatProperty(property))
		}	

		for(let i = 0; i < blogIds.length; i++ ){
			const blog = await this.strapiService.getContent({  id: blogIds[i].id.toString() , content: ECMSContent.BLOG});
			blogs.push(this.blogService.formatBlog(blog));
		}

		return { properties, blogs }
	}
}

