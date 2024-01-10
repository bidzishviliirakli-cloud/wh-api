import { ECMSContent, IProperty } from "@contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PropertyService } from "./property.service";
import { ICity } from "src/contracts/interface/ICity";

@ApiTags(ECMSContent.PROPERTY)
@Controller(`content/${ECMSContent.PROPERTY}`)
export class PropertyController {
	constructor(private propertyService: PropertyService) {}

	@Get("locations")
	getLocations(@Query("locale") locale: string): Promise<Array<ICity>> {
		return this.propertyService.getLocations(locale);
	}
	//TODO: add interfaces

	@Get("categories")
	getPropertyCategories(@Query("locale") locale: string) {
		return this.propertyService.getPropertyCategories(locale);
	}

	//TODO: add interfaces

	@Get("dealTypes")
	getDealType(@Query("locale") locale: string) {
		return this.propertyService.getDealTypes(locale);
	}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IProperty> {
		return this.propertyService.getOne(id);
	}

	@Get()
	getMany(@Query() filter): Promise<Array<IProperty>> {
		return this.propertyService.getMany(filter);
	}
}
