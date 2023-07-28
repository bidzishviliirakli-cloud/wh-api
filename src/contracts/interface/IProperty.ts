import { IDealType } from "./IDealType";
import { ICity } from "./ICity";
import { IPropertyAmenity } from "./IPropertyAmenity";
import { IPropertyCategory } from "./IPropertyCategory";
import { IStrapiImage } from "./IStrapiImage";
import { IAgent } from "./IAgent";
import { IDeveloper } from "./IDeveloper";
import { IDistrict } from "./IDistrict";

export interface IProperty {
	id: number;
	attributes: {
		title: string;
		pinned: boolean;
		description: string;
		size: number;
		bedroomQuantity: number;
		price: number;
		streetAddress: string;
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
		city: {
			data: ICity;
		};
		district: {
			data: IDistrict;
		}
		developer: {
			data: IDeveloper;
		};

	};
}
