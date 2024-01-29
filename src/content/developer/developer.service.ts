import { ECMSContent, IDeveloper, IDeveloperQueryFilter, IProject } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ProjectService } from "../project";
import { Util } from "@util";

@Injectable()
export class DeveloperService {
	content = ECMSContent.DEVELOPER;

	constructor(private strapiService: StrapiService, private projectService: ProjectService) {}

	async getOne(id: string): Promise<any> {
		const developer = await this.strapiService.getContent({ id, content: this.content });

		return this.formatDeveloper(developer, true);
	}

	async getMany(filter: IDeveloperQueryFilter): Promise<Array<any>> {
		const { locale, title } = filter;
		let strapiFilter = "";

		if (!Util.isNull(title)) {
			strapiFilter += `filters[title][$containsi]=${title}`;
		}

		const developers = await this.strapiService.getContent({ content: this.content, locale, filter: strapiFilter });

		return Promise.all(developers.map( async (el) => await this.formatDeveloper(el)));
	}

	private async formatDeveloper(developer: IDeveloper, detailed = false): Promise<any> {
		const projects = await this.getProjectsInfo(developer, detailed);

		return {
			id: developer?.id,
			ceo: developer?.attributes?.ceo,
			title: developer?.attributes?.title,
			cover: developer?.attributes?.cover?.data?.attributes?.url,
			url: developer?.attributes?.url,
			description: developer?.attributes?.description,
			projects,
			createdAt: developer?.attributes?.createdAt,
			publishedAt: developer?.attributes?.publishedAt,
			updatedAt: developer?.attributes?.updatedAt
		};
	}

	private async getProjectsInfo(developer: IDeveloper, detailed: boolean): Promise<any> {
		if (!detailed) {
			return developer?.attributes?.projects?.data?.map((el) => this.projectService.formatProject(el));
		}

		const projectIds = developer.attributes?.projects?.data;
		const projects = [];
		

		for (let i = 0; i < projectIds.length; i++) {
			const project = await this.strapiService.getContent({
				id: projectIds[i]?.id?.toString(),
				content: ECMSContent.PROJECT
			});

			projects.push(this.projectService.formatProject(project));
		}

		return projects ;
	}
}
