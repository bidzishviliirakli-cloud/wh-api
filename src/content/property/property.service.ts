import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";
import { ECMSContent, IProperty } from "@contracts";
import { IPropertyQueryFilter } from "src/contracts/interface/IPropertyQueryFilter";

@Injectable()
export class PropertyService {
	content = ECMSContent.PROPERTY;

	constructor(private strapiService: StrapiService) {}

	async getOne(id: string): Promise<IProperty> {
		return this.strapiService.getContent({ id, content: this.content });
	}

	async getMany(filter: IPropertyQueryFilter): Promise<Array<IProperty>> {
		const data: IProperty[] = await this.strapiService.getContent({ content: this.content });

		const filteredData = this.queryFilter(filter, data);

		return filteredData;
	}

	private queryFilter(filter: IPropertyQueryFilter, data: Array<IProperty>): Array<IProperty> {
		const { location, dealType, category } = filter;
		let filteredData = data;

		if (location) {
			filteredData = data.filter((el) => el?.attributes?.propertyLocation?.data?.attributes?.title === location);
		}

		if (dealType) {
			filteredData = filteredData.filter((el) => el?.attributes?.dealType?.data?.attributes?.title === dealType);
		}

		if (category) {
			filteredData = filteredData.filter(
				(el) => el?.attributes?.propertyCategory?.data?.attributes?.title === category
			);
		}

		return filteredData;
	}
}
