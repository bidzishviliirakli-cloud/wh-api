import { IsDefined, IsEmail, IsString } from "class-validator"

export class ICustomerContactRequestPayloadDTO {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    lastName: string;

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    phoneNumber: string;

    @IsDefined()
    @IsString()
    property: string;

    @IsDefined()
    @IsString()
    contactDetails: string
}