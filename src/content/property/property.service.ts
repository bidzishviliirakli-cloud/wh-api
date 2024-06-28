import { Injectable } from "@nestjs/common";

import { StrapiService } from "@strapi";
import { ECMSContent, IAgent, IProperty } from "@contracts";
import { Util } from "@util";
import { IPropertyQueryFilter } from "src/contracts/interface/IPropertyQueryFilter";
import { ICity } from "src/contracts/interface/ICity";
import { IUploadPropertyDTO } from "@dto";
import { IDistrict } from "src/contracts/interface/IDistrict";
import { IPropertyAmenity } from "src/contracts/interface/IPropertyAmenity";

import { Translate } from "src/translator";


@Injectable()
export class PropertyService {
	content = ECMSContent.PROPERTY;
	translationEngine;

	constructor(private strapiService: StrapiService) {
		this.translationEngine = new Translate();

	}

	async getOne(id: string): Promise<IProperty> {
		const property = await this.strapiService.getContent({ id, content: this.content });
		const priceInGel = Util.convertUsdToGel(property.attributes.price);
		const geoLocation = await this.strapiService.getGeoLocation(property.attributes.streetAddress);

		return this.formatProperty(property, priceInGel, geoLocation);
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
				const priceInGel = Util.convertUsdToGel(el.attributes.price);
				const formatedProperty = await this.formatProperty(el, priceInGel);

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

	async getHeatingTypes(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.HEATING_TYPE, locale });
		return data.map( el => this.commonFormatter(el));

	}

	async getParkingTypes(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.PARKING_TYPE, locale });
		return data.map( el => this.commonFormatter(el));

	}

	async getCondintionTypes(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.PROPERTY_CONDINTION_TYPE, locale });
		return data.map( el => this.commonFormatter(el));

	}

	async getStatusTypes(locale: string) {
		const data = await this.strapiService.getContent({ content: ECMSContent.PROPERTY_STATUS_TYPE, locale });
		return data.map( el => this.commonFormatter(el));
	}


	async upload(body: IUploadPropertyDTO) {
		const translated = await this.translateProperty(body);

		await this.strapiService.createContent({ data: body, content: ECMSContent.PROPERTY})
		await this.strapiService.createContent({ data: translated, content: ECMSContent.PROPERTY })


		return "ok";
	}

	async formatProperty(property: IProperty, priceInGel?: number, geoLocation?: any): Promise<any> {
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
			roomQuantity: property.attributes?.roomQuantity,
			floor: property.attributes?.floor,
			totalFloor: property.attributes?.totalFloor,
			status: property.attributes?.status,
			condition: property.attributes?.condition,
			ceilingHeight: property.attributes?.ceilingHeight,
			heating: property.attributes?.heating,
			parkingType: property.attributes?.parkingType,
			developer: {
				title: property.attributes?.developer?.data?.attributes?.title,
				ceo: property.attributes?.developer?.data?.attributes?.ceo
			},
			//@ts-ignore
			gallery:JSON.parse(property.attributes?.gallery),
			agent: this.formatAgentForProperty(agent),
			pinned: property.attributes?.pinned,
			amenities: property.attributes?.propertyAmenities?.data?.map((el) => {
				const title = el?.attributes?.title;
				const svg = el?.attributes?.title;

				//@TODO get icon url
				// const svg = el?.attributes?.icon.attributes.url;

				return { title, svg };
			}),
			category: property.attributes?.propertyCategory,
			city: property.attributes?.city,
			district: property.attributes?.district,
			size: property.attributes?.size,
			title: property.attributes?.title,
			price: {
				gel: priceInGel?.toLocaleString("ge-GE"),
				usd: property.attributes?.price?.toLocaleString("en-US")
			},
			createdAt: property.attributes?.createdAt,
			publishedAt: property.attributes?.publishedAt,
			updatedAt: property.attributes?.updatedAt
		};
	}


	private async translateProperty(body: IUploadPropertyDTO): Promise<IUploadPropertyDTO>{
		const english = "en";
		const translated: IUploadPropertyDTO = {
			title: "",
			description: "",
			aboutProperty: "",
			size: 0,
			bedroomQuantity: 0,
			price: 0,
			streetAddress: "",
			propertyAmenities: [],
			propertyCategory: "",
			dealType: "",
			gallery: "",
			developer: "",
			agent: "",
			pinned: false,
			city: "",
			district: "",
			bathroom: 0,
			parking: 0,
			locale: english

		};

		translated.title = await this.translationEngine.do(body.title, english);
		translated.description = await this.translationEngine.do(body.description, english);
		translated.aboutProperty = await this.translationEngine.do(body.aboutProperty, english);
		translated.dealType = await this.translationEngine.do(body.dealType, english);
		translated.propertyCategory = await this.translationEngine.do(body.propertyCategory, english);
		translated.city = await this.translationEngine.do(body.city, english);
		
		translated.size = body.size;
		translated.bedroomQuantity = body.bedroomQuantity;
		translated.price = body.price;
		translated.bathroom = body.bathroom;
		translated.parking = body.parking;
		
		translated.streetAddress = body.streetAddress;
		translated.district = body.district;
		translated.gallery = body.gallery;
		translated.pinned = body.pinned;
		translated.locale = english;

		//Get relation IDS for those
		translated.propertyAmenities = body.propertyAmenities;
		translated.developer = body.developer;
		translated.agent = body.agent;
	

		return translated;

	}

	private commonFormatter(commonObj: any): any {
		return {
			id: commonObj?.id,
			title: commonObj?.attributes?.title
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
			icon: amenity?.attributes?.icon?.data?.attributes?.url,
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
