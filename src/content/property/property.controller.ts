import { ECMSContent, IProperty } from "@contracts";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PropertyService } from "./property.service";
import { ICity } from "src/contracts/interface/ICity";
import { IUploadPropertyDTO } from "@dto";
import { IDistrict } from "src/contracts/interface/IDistrict";

@ApiTags(ECMSContent.PROPERTY)
@Controller(`content/${ECMSContent.PROPERTY}`)
export class PropertyController {
	constructor(private propertyService: PropertyService) {}

	@Get("locations")
	getLocations(@Query("locale") locale: string): Promise<Array<ICity>> {
		return this.propertyService.getLocations(locale);
	}

	@Get("districts")
	getDistricts(@Query("locale") locale: string): Promise<Array<IDistrict>> {
		return this.propertyService.getDistricts(locale);
	}

	@Get("categories")
	getPropertyCategories(@Query("locale") locale: string) {
		return this.propertyService.getPropertyCategories(locale);
	}

	@Get("dealTypes")
	getDealType(@Query("locale") locale: string) {
		return this.propertyService.getDealTypes(locale);
	}

	@Get("amenities")
	getAmenities(@Query("locale") locale: string) {
		return this.propertyService.getAmenities(locale);
	}

	@Get("heatingTypes")
	getHeatingTypes(@Query("locale") locale: string) {
		return this.propertyService.getHeatingTypes(locale);
	}

	@Get("parkingTypes")
	getParkingTypes(@Query("locale") locale: string) {
		return this.propertyService.getParkingTypes(locale);
	}

	@Get("condintionTypes")
	getCondintionTypes(@Query("locale") locale: string) {
		return this.propertyService.getCondintionTypes(locale);
	}

	@Get("statusTypes")
	getStatusTypes(@Query("locale") locale: string) {
		return this.propertyService.getStatusTypes(locale);
	}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IProperty> {
		return this.propertyService.getOne(id);
	}

	@Get()
	getMany(@Query() filter): Promise<Array<IProperty>> {
		return this.propertyService.getMany(filter);
	}

	@Post("upload")
	upload(@Body() body: IUploadPropertyDTO): Promise<any> {
		return this.propertyService.upload(body);
	}
}
