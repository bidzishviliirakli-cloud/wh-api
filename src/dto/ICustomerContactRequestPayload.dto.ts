import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString } from "class-validator";

export class ICustomerContactRequestPayloadDTO {
	@ApiProperty({ description: "Customer name", type: String })
	@IsDefined()
	@IsString()
	name: string;

	@ApiProperty({ description: "Customer lastName", type: String })
	@IsDefined()
	@IsString()
	lastName: string;

	@ApiProperty({ description: "Customer email", type: String })
	@IsDefined()
	@IsEmail()
	email: string;

	@ApiProperty({ description: "Customer phone number", type: String })
	@IsDefined()
	@IsString()
	phoneNumber: string;

	@ApiProperty({ description: "Property Id", type: String })
	@IsDefined()
	@IsString()
	property: string;

	@ApiProperty({ description: "Customer contact details, random information", type: String })
	@IsDefined()
	@IsString()
	contactDetails: string;
}
