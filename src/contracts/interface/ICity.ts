import { IDistrict } from "./IDistrict";

export interface ICity {
	id: number;
	attributes: {
		districts: {
			data: IDistrict[];
		};
		name: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
