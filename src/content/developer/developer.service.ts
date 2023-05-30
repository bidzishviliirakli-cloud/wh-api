import { ECMSContent, IDeveloper } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class DeveloperService {
	content = ECMSContent.DEVELOPER;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IDeveloper> {
		const developer = await this.strapiService.getContent({ id, content: this.content });

		return this.formatDeveloper(developer);
	}

	async getMany(): Promise<Array<IDeveloper>> {
		const developers = await this.strapiService.getContent({ content: this.content });

		return developers.map((el) => this.formatDeveloper(el));
	}

	private formatDeveloper(developer: IDeveloper): any {
		return {
			id: developer.id,
			ceo: developer.attributes?.ceo,
			title: developer.attributes?.title
		};
	}
}
