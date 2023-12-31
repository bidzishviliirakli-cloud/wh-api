import { IProject } from "./IProject";
import { IStrapiImage } from "./IStrapiImage";

export interface IDeveloper {
	id: number;
	attributes: {
		title: string;
		ceo: string;
		description: string;
		url: string;
		cover: {
			data: IStrapiImage
		}
		projects: {
			data: IProject[]
		}
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
