import { ECMSContent, IDeveloper } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ProjectService } from "../project";

@Injectable()
export class DeveloperService {
	content = ECMSContent.DEVELOPER;

	constructor(private strapiService: StrapiService, private projectService: ProjectService) {}

	async getOne(id: string): Promise<any> {
		const developer = await this.strapiService.getContent({ id, content: this.content });

		return this.formatDeveloper(developer);
	}

	async getMany(): Promise<Array<any>> {
		const developers = await this.strapiService.getContent({ content: this.content });

		return developers.map((el) => this.formatDeveloper(el));
	}

	private formatDeveloper(developer: IDeveloper): any {
		return {
			id: developer?.id,
			ceo: developer?.attributes?.ceo,
			title: developer?.attributes?.title,
			cover: developer?.attributes?.cover?.data?.attributes?.url,
			url: developer?.attributes?.url,
			description: developer?.attributes?.description,
			projects: developer.attributes.projects.data.map( el => this.projectService.formatProject(el)),
			createdAt: developer?.attributes?.createdAt,
			publishedAt: developer?.attributes?.publishedAt,
			updatedAt: developer?.attributes?.updatedAt,
		};
	}
}
