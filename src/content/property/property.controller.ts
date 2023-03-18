import { IProperty } from "@contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";

import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private propertyService: PropertyService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IProperty> {
		return this.propertyService.getOne(id);
	}

	@Get()
	getMany(@Query() filter): Promise<Array<IProperty>> {
		return this.propertyService.getMany(filter);
	}
}
