import { IBlog } from "./IBlog";
import { IStrapiImage } from "./IStrapiImage";
import { IProperty } from "./IProperty";

export interface IAgent {
	id: number;
	attributes: {
		name: string;
		lastName: string;
		about: string;
		phoneNumber: number;
		email: string;
		status: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
		profilePicture: {
			data: IStrapiImage;
		};
		properties: {
			data: Array<IProperty>;
		};
		blogs: {
			data: Array<IBlog>;
		};
	};
}
