import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { IAgent, ECMSContent } from "@contracts";

@Injectable()
export class AgentService {
	content = ECMSContent.AGENT;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IAgent> {
		const agent = await this.strapiService.getContent({ id, content: this.content });

		return this.formatAgent(agent);
	}

	async getMany(): Promise<Array<IAgent>> {
		const agents = await this.strapiService.getContent({ content: this.content });

		return agents.map((el) => this.formatAgent(el));
	}

	private formatAgent(agent: IAgent): any {
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
				thumbnail: agent.attributes?.profilePicture?.data?.attributes?.formats?.thumbnail?.url
			},
			properties: agent.attributes?.properties?.data?.map((el) => {
				return {
					id: el.id,
					address: el.attributes?.address,
					bedroomQuantity: el.attributes?.bedroomQuantity,
					description: el.attributes?.description,
					pinned: el.attributes?.pinned,
					price: el.attributes?.price,
					size: el.attributes?.size,
					title: el.attributes?.title
				};
			})
		};
	}
}
