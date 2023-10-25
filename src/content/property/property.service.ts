import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IProperty } from "@contracts";
import { IPropertyQueryFilter } from "src/contracts/interface/IPropertyQueryFilter";
import { ICity } from "src/contracts/interface/ICity";

@Injectable()
export class PropertyService {
	content = ECMSContent.PROPERTY;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IProperty> {
		const property = await this.strapiService.getContent({ id, content: this.content });

		return this.formatProperty(property);
	}

	async getMany(filter: IPropertyQueryFilter): Promise<Array<IProperty>> {
		const data: IProperty[] = await this.strapiService.getContent({ content: this.content });

		return this.queryFilter(filter, data).map((el) => this.formatProperty(el));
	}

	async getLocations(){
		const data: ICity[] = await this.strapiService.getContent({ content: ECMSContent.CITY });

		return data.map((el) => this.formatCity(el));
 
	}
	

	//TODO: add interfaces

	async getPropertyCategories(){
		const data = await this.strapiService.getContent({ content: ECMSContent.PROPERTY_CATEGORY });

		return data.map((el) => this.formatCategory(el));
	}

	//TODO: add interfaces

	async getDealTypes(){
		const data = await this.strapiService.getContent({ content: ECMSContent.DEAL_TYPE });

		return data.map(el => this.formatDealType(el));
	}

	private queryFilter(filter: IPropertyQueryFilter, data: Array<IProperty>): Array<IProperty> {
		const { city, district, dealType, category, agent } = filter;
		let filteredData = data;

		if (city) {
			filteredData = data.filter((el) => el?.attributes?.city?.data?.attributes?.name === city);
		}

		if (district) {
			filteredData = data.filter((el) => el?.attributes?.district?.data?.attributes?.name === district);
		}

		if (dealType) {
			filteredData = filteredData.filter((el) => el?.attributes?.dealType?.data?.attributes?.title === dealType);
		}

		if (category) {
			filteredData = filteredData.filter(
				(el) => el?.attributes?.propertyCategory?.data?.attributes?.title === category
			);
		}

		if (agent) {
			filteredData = filteredData.filter((el) => el?.attributes?.agent?.data?.attributes?.name === agent);
		}

		return filteredData;
	}

	//TODO fix interfaces

	private formatProperty(property: IProperty): any {
		return {
			id: property.id,
			streetAddress: property.attributes?.streetAddress,
			bedRoomQuantity: property.attributes?.bedroomQuantity,
			dealType: property.attributes?.dealType?.data?.attributes?.title,
			description: property.attributes?.description,
			developer: {
				title: property.attributes?.developer?.data?.attributes?.title,
				ceo: property.attributes?.developer?.data?.attributes?.ceo
			},
			gallery: property.attributes?.gallery?.data?.map((el) => {
				const formats = el.attributes?.formats;

				return {
					large: formats?.large?.url,
					medium: formats?.medium?.url,
					small: formats?.small?.url,
					thumbnail: formats?.thumbnail?.url,
					url: el.attributes.url
				};
			}),
			agent: property.attributes?.agent?.data?.id,
			pinned: property.attributes?.pinned,
			amenities: property.attributes?.propertyAmenities?.data?.map((el) => el?.attributes?.title),
			category: property.attributes?.propertyCategory?.data?.attributes?.title,
			city: property.attributes?.city?.data?.attributes?.name,
			district: property.attributes?.district?.data?.attributes?.name,
			size: property.attributes?.size,
			title: property.attributes?.title,
			price: property.attributes?.price,
			createdAt: property.attributes?.createdAt,
			publishedAt: property.attributes?.publishedAt,
			updatedAt: property.attributes?.updatedAt,
		};
	}

	private formatCity(city: ICity): any{
		return {
			id: city?.id,
			title: city?.attributes?.name,
			districts: city?.attributes?.districts.data.map( el => el.attributes.name ),
			createdAt: city.attributes?.createdAt,
			publishedAt: city.attributes?.publishedAt,
			updatedAt: city.attributes?.updatedAt,
		}
	}

	private formatCategory(category: any): any {
		return {
			id: category.id,
			title: category.attributes.title
		}
	}

	private formatDealType(dealType: any): any {
		return {
			id: dealType.id,
			title: dealType.attributes.title
		}
	}
}
