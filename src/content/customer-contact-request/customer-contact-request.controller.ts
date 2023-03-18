import { ICustomerContactRequest } from "@contracts";
import { ICustomerContactRequestPayloadDTO } from "@dto";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CustomerContactRequestService } from "./customer-contact-request.service";

@Controller("customer-contact-request")
export class CustomerContactRequestController {
	constructor(private customerContactRequestService: CustomerContactRequestService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<ICustomerContactRequest> {
		return this.customerContactRequestService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<ICustomerContactRequest>> {
		return this.customerContactRequestService.getMany();
	}

	@Post("call-me")
	callMe(@Body() payload: ICustomerContactRequestPayloadDTO): Promise<ICustomerContactRequest> {
		return this.customerContactRequestService.callMe(payload);
	}
}
