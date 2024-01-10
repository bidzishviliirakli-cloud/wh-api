import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IProject } from "@contracts";

@Injectable()
export class ProjectService {
	content = ECMSContent.PROJECT;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<any> {
		const project: IProject = await this.strapiService.getContent({ id, content: this.content });

		return this.formatProject(project);
	}

	async getMany(locale: string): Promise<Array<any>> {
		const data: IProject[] = await this.strapiService.getContent({ content: this.content, locale });

		return data.map((el) => this.formatProject(el));
	}

	public formatProject(project: IProject) {
		return {
			id: project.id,
			address: project?.attributes?.address,
			cadastralCode: project?.attributes?.cadastralCode,
			city: project?.attributes?.city?.data?.attributes?.name,
			communications: project?.attributes?.communications,
			condintionOfAppartments: project?.attributes?.condintionOfAppartments,
			constructionTechnology: project?.attributes?.constructionTechnology,
			cover: project?.attributes?.cover?.data?.attributes?.url,
			gallery: project?.attributes?.gallery?.data?.map((el) => {
				const formats = el?.attributes?.formats;

				return {
					large: formats?.large?.url,
					medium: formats?.medium?.url,
					small: formats?.small?.url,
					thumbnail: formats?.thumbnail?.url,
					url: el?.attributes?.url
				};
			}),
			description: project?.attributes?.description,
			developer: project?.attributes?.developer?.data?.attributes?.title,
			elevator: project?.attributes?.elevator,
			infrastructure: project?.attributes?.infrastructure,
			numberOfAppartments: project?.attributes?.numberOfAppartments,
			numberOfFloor: project?.attributes?.numberOfFloor,
			parking: project?.attributes?.parking,
			pricesFrom: project?.attributes?.pricesFrom,
			security: project?.attributes?.security,
			squareMeterPrice: project?.attributes?.squareMeterPrice,
			title: project?.attributes?.title,
			createdAt: project?.attributes?.createdAt,
			updatedAt: project?.attributes?.updatedAt
		};
	}
}
