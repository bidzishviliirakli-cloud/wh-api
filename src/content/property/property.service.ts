import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IAgent, IProperty } from "@contracts";
import { Util } from "@util";
import { IPropertyQueryFilter } from "src/contracts/interface/IPropertyQueryFilter";
import { ICity } from "src/contracts/interface/ICity";
import { IUploadPropertyDTO } from "@dto";
import { IDistrict } from "src/contracts/interface/IDistrict";
import { IPropertyAmenity } from "src/contracts/interface/IPropertyAmenity";

@Injectable()
export class PropertyService {
	content = ECMSContent.PROPERTY;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IProperty> {
		const property = await this.strapiService.getContent({ id, content: this.content });
		const priceInUsd = Util.convertGelToUsd(property.attributes.price);
		const geoLocation = await this.strapiService.getGeoLocation(property.attributes.streetAddress);

		return this.formatProperty(property, priceInUsd, geoLocation);
	}

	async getMany(filter: IPropertyQueryFilter): Promise<Array<IProperty>> {
		let strapiFilter = "";

		const propertyCategoryFilterList = filter?.category?.split(",");
		propertyCategoryFilterList?.forEach((category) => {
			if (!Util.isNull(category)) {
				strapiFilter += `filters[propertyCategory][title][$eqi]=${category}&`;
			}
		});

		const cityFilterList = filter?.city?.split(",");
		cityFilterList?.forEach((city) => {
			if (!Util.isNull(city)) {
				strapiFilter += `filters[city][name][$eqi]=${city}&`;
			}
		});

		const districtFilterList = filter?.district?.split(",");
		districtFilterList?.forEach((district) => {
			if (!Util.isNull(district)) {
				strapiFilter += `filters[district][name][$eqi]=${district}&`;
			}
		});

		const dealTypeFilterList = filter?.dealType?.split(",");
		dealTypeFilterList?.forEach((dealType) => {
			if (!Util.isNull(dealType)) {
				strapiFilter += `filters[dealType][title][$eqi]=${dealType}&`;
			}
		});

		if (!Util.isNull(filter.text)) {
			strapiFilter += `filters[id][$eq]=${filter.text}&`;
		}

		const data: IProperty[] = await this.strapiService.getContent({
			content: this.content,
			filter: strapiFilter,
			locale: filter.locale
		});

		return Promise.all(
			data.map(async (el) => {
				const priceInUsd = Util.convertGelToUsd(el.attributes.price);
				const formatedProperty = await this.formatProperty(el, priceInUsd);

				return formatedProperty;
			})
		);
	}

	async getLocations(locale: string) {
		const data: ICity[] = await this.strapiService.getContent({ content: ECMSContent.CITY, locale });

		return data.map((el) => this.formatCity(el));
	}

	async getDistricts(locale: string) {
		const data: ICity[] = await this.strapiService.getContent({ content: ECMSContent.DISTRICT, locale });

		return data.map((el) => this.formatDistrict(el));
	}
	

	async getPropertyCategories(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.PROPERTY_CATEGORY, locale });

		return data.map((el) => this.formatCategory(el));
	}

	async getDealTypes(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.DEAL_TYPE, locale });

		return data.map((el) => this.formatDealType(el));
	}
	
	async getAmenities(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.PROPERTY_AMENITY, locale });
		return data.map((el) => this.formatAmenity(el));
	}


	async upload(body: IUploadPropertyDTO) {
		const property = await this.strapiService.createContent({ data: body, content: ECMSContent.PROPERTY})
		return "ok";
	}

	public async formatProperty(property: IProperty, priceInUsd?: number, geoLocation?: any): Promise<any> {
		const agent = await this.strapiService.getContent({
			id: property.attributes?.agent?.data?.id.toString(),
			content: ECMSContent.AGENT
		});

		return {
			id: property.id,
			streetAddress: property.attributes?.streetAddress,
			lat: geoLocation?.lat,
			lng: geoLocation?.lng,
			bedRoomQuantity: property.attributes?.bedroomQuantity,
			dealType: property.attributes?.dealType,
			description: property.attributes?.description,
			aboutProperty: property.attributes?.aboutProperty,
			parking: property.attributes?.parking,
			bathroom: property.attributes?.bathroom,
			developer: {
				title: property.attributes?.developer?.data?.attributes?.title,
				ceo: property.attributes?.developer?.data?.attributes?.ceo
			},
			gallery: property.attributes?.gallery,
			agent: this.formatAgentForProperty(agent),
			pinned: property.attributes?.pinned,
			amenities: property.attributes?.propertyAmenities?.data?.map((el) => {
				const title = el?.attributes?.title;
				const svg = el?.attributes?.title;

				return { title, svg };
			}),
			category: property.attributes?.propertyCategory,
			city: property.attributes?.city,
			district: property.attributes?.district,
			size: property.attributes?.size,
			title: property.attributes?.title,
			price: {
				usd: priceInUsd?.toLocaleString("en-US"),
				gel: property.attributes?.price?.toLocaleString("ge-GE")
			},
			createdAt: property.attributes?.createdAt,
			publishedAt: property.attributes?.publishedAt,
			updatedAt: property.attributes?.updatedAt
		};
	}

	private formatCity(city: ICity): any {
		return {
			id: city?.id,
			title: city?.attributes?.name,
			districts: city?.attributes?.districts?.data?.map((el) => el?.attributes?.name),
			createdAt: city?.attributes?.createdAt,
			publishedAt: city?.attributes?.publishedAt,
			updatedAt: city?.attributes?.updatedAt
		};
	}

	private formatDistrict(district: IDistrict): any {
		return {
			id: district?.id,
			title: district?.attributes?.name,
			createdAt: district?.attributes?.createdAt,
			publishedAt: district?.attributes?.publishedAt,
			updatedAt: district?.attributes?.updatedAt
		};
	}

	private formatAmenity(amenity: IPropertyAmenity): any {
		return {
			id: amenity?.id,
			title: amenity?.attributes?.title,
			//@ts-ignore
			icon: amenity?.attributes.icon.data.attributes.url,
			createdAt: amenity?.attributes?.createdAt,
			publishedAt: amenity?.attributes?.publishedAt,
			updatedAt: amenity?.attributes?.updatedAt
		};
	}

	private formatCategory(category: any): any {
		return {
			id: category.id,
			title: category.attributes.title
		};
	}

	private formatDealType(dealType: any): any {
		return {
			id: dealType.id,
			title: dealType.attributes.title
		};
	}

	private formatAgentForProperty(agent: IAgent) {
		return {
			id: agent.id,
			about: agent.attributes?.about,
			email: agent.attributes?.email,
			name: agent.attributes?.name,
			lastName: agent.attributes?.lastName,
			phoneNumber: agent.attributes?.phoneNumber,
			profilePicture: {
				large: agent.attributes?.profilePicture?.data?.attributes?.formats?.large?.url,
				medium: agent.attributes?.profilePicture?.data?.attributes?.formats?.medium?.url,
				small: agent.attributes?.profilePicture?.data?.attributes?.formats?.small?.url,
				thumbnail: agent.attributes?.profilePicture?.data?.attributes?.formats?.thumbnail?.url,
				url: agent.attributes?.profilePicture?.data?.attributes?.url
			}
		};
	}
}
