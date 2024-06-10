import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNumber, IsString } from "class-validator";

export class IUploadPropertyDTO {
	@ApiProperty({ description: "Property Title", type: String })
	@IsDefined()
	@IsString()
	title: string;

	@ApiProperty({ description: "Property Description", type: String })
	@IsDefined()
	@IsString()
	description: string;

	@ApiProperty({ description: "Property size in m2", type: Number })
	@IsDefined()
	size: number;

	@ApiProperty({ description: "Quantity of the bedrooms", type: Number })
	@IsDefined()
	@IsNumber()
	bedroomQuantity: number;

	@ApiProperty({ description: "Property price in GEL", type: Number })
	@IsDefined()
	@IsNumber()
	price: number;

	@ApiProperty({ description: "Property street address", type: String })
	@IsDefined()
	@IsString()
	streetAddress: string;

	@ApiProperty({
		description: "List of Amenities that property has, it should be array of amenity ids or names",
		type: Array
	})
	@IsDefined({ each: true })
	@IsString({ each: true })
	propertyAmenities: string[];

	@ApiProperty({ description: "Property category", type: String })
	@IsDefined()
	@IsString()
	propertyCategory: string;

	@ApiProperty({ description: "Input should be Sale or Rent", type: String })
	@IsDefined()
	@IsString()
	dealType: string;

	@ApiProperty({ description: "Property Gallery, array of URLs", type: Array })
	@IsDefined()
	@IsString({ each: true })
	gallery: string[];

	@ApiProperty({ description: "Property Developer Company", type: String })
	@IsDefined()
	@IsString()
	developer: string;

	@ApiProperty({ description: "Property Agent", type: String })
	@IsDefined()
	@IsString()
	agent: string;

	@ApiProperty({ description: "Make property appear on the top of the home page", type: Boolean })
	@IsDefined()
	@IsBoolean()
	pinned: boolean;

	@ApiProperty({ description: "City location of the property", type: String })
	@IsDefined()
	@IsString()
	city: string;

	@ApiProperty({ description: "District location of the property", type: String })
	@IsDefined()
	@IsString()
	district: string;

	@ApiProperty({ description: "About the property", type: String })
	@IsDefined()
	@IsString()
	aboutProperty: string;

	@ApiProperty({ description: "Bathroom quantity", type: Number })
	@IsDefined()
	@IsNumber()
	bathroom: 0;

	@ApiProperty({ description: "Parking quantity", type: Number })
	@IsDefined()
	@IsNumber()
	parking: 0;

	@ApiProperty({ description: "Language", type: String })
	@IsDefined()
	@IsString()
	locale: string;
}
