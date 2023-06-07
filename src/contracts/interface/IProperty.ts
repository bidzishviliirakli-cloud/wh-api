import { IDealType } from "./IDealType";
import { IPropertyLocation } from "./IPropertyLocation";
import { IPropertyAmenity } from "./IPropertyAmenity";
import { IPropertyCategory } from "./IPropertyCategory";
import { IStrapiImage } from "./IStrapiImage";
import { IAgent } from "./IAgent";
import { IDeveloper } from "./IDeveloper";

export interface IProperty {
	id: number;
	attributes: {
		title: string;
		pinned: boolean;
		description: string;
		size: number;
		bedroomQuantity: number;
		price: number;
		address: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
		agent:{
			data: IAgent
		};
		propertyAmenities: {
			data: Array<IPropertyAmenity>;
		};
		propertyCategory: {
			data: IPropertyCategory;
		};
		dealType: {
			data: IDealType;
		};

		gallery: {
			data: Array<IStrapiImage>;
		};
		propertyLocation: {
			data: IPropertyLocation;
		};
		developer: {
			data: IDeveloper;
		};
	};
}
