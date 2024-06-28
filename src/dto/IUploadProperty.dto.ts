import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IUploadPropertyDTO {
	@ApiProperty({ description: "Property Title", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ description: "Property Description", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: "Property size in m2", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	size: number;

	@ApiProperty({ description: "Quantity of the bedrooms", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	bedroomQuantity: number;

	@ApiProperty({ description: "Property price in GEL", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	price: number;

	@ApiProperty({ description: "Property street address", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	streetAddress: string;

	@ApiProperty({
		description: "List of Amenities that property has, it should be array of amenity IDs",
		type: Array
	})
	@IsDefined({ each: true })
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	propertyAmenities: string[];

	@ApiProperty({ description: "Property category", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	propertyCategory: string;

	@ApiProperty({ description: "Input should be Sale or Rent", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	dealType: string;

	@ApiProperty({ description: "Property Gallery, String array of URLs", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	gallery: string;

	@ApiProperty({ description: "ID of the Developer company", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	developer: string;

	@ApiProperty({ description: "Property Agent ID", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	agent: string;

	@ApiProperty({ description: "Make property appear on the top of the home page", type: Boolean })
	@IsDefined()
	@IsBoolean()
	@IsNotEmpty()
	pinned: boolean;

	@ApiProperty({ description: "City location of the property", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	city: string;

	@ApiProperty({ description: "District location of the property", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	district: string;

	@ApiProperty({ description: "About the property", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	aboutProperty: string;

	@ApiProperty({ description: "Bathroom quantity", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	bathroom: number;

	@ApiProperty({ description: "Parking quantity", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	parking: number;

	@ApiProperty({ description: "Rooms quantity", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	roomQuantity: number;

	@ApiProperty({ description: "Floor", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	floor: number;

	@ApiProperty({ description: "Total Floors in building", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	totalFloor: number;

	@ApiProperty({ description: "Ceiling height", type: Number })
	@IsDefined()
	@IsNumber()
	@IsNotEmpty()
	ceilingHeight: number;

	@ApiProperty({ description: "Status of the object", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	status: string;

	@ApiProperty({ description: "Condintion", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	condition: string;

	@ApiProperty({ description: "Heating type", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	heating: string;

	@ApiProperty({ description: "Parking Type", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	parkingType: string;

	@ApiProperty({ description: "Language", type: String })
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	locale: string;
}
