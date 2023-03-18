import { IDealType } from "./IDealType";
import { IPropertyLocation } from "./IPropertyLocation";
import { IPropertyAmenity } from "./IPropertyAmenity";
import { IPropertyCategory } from "./IPropertyCategory";
import { IStrapiImage } from "./IStrapiImage";

export interface IProperty {
	id: number;
	attributes: {
		title: string;
		description: string;
		size: number;
		bedroomQuantity: number;
		price: number;
		address: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
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
		developer: object;
	};
}
