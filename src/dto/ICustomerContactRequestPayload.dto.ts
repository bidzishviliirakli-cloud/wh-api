import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsOptional, IsString } from "class-validator";

export class ICustomerContactRequestPayloadDTO {
	@ApiProperty({ description: "Customer name", type: String })
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty({ description: "Customer lastName", type: String })
	@IsOptional()
	@IsString()
	lastName: string;

	@ApiProperty({ description: "Customer email", type: String })
	@IsDefined()
	@IsEmail()
	email: string;

	@ApiProperty({ description: "Customer phone number", type: String })
	@IsOptional()
	@IsString()
	phoneNumber: string;

	@ApiProperty({ description: "Property Id", type: String })
	@IsOptional()
	@IsString()
	property: string;

	@ApiProperty({ description: "Developer Id", type: String })
	@IsOptional()
	@IsString()
	developer: string;

	@ApiProperty({ description: "Project Id", type: String })
	@IsOptional()
	@IsString()
	project: string;

	@ApiProperty({ description: "Customer contact details, random information", type: String })
	@IsOptional()
	@IsString()
	contactDetails: string;
}
