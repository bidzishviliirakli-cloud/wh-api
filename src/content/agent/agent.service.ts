import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { IAgent, ECMSContent } from "@contracts";

@Injectable()
export class AgentService {
	content = ECMSContent.AGENT;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IAgent> {
		const data = await this.strapiService.getContent({ id, content: this.content });
		return data;
	}

	async getMany(): Promise<Array<IAgent>> {
		const data = await this.strapiService.getContent({ content: this.content });
		return data;
	}
}
