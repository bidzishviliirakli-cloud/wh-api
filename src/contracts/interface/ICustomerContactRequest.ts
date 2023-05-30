import { IProperty } from "./IProperty";

export interface ICustomerContactRequest {
	id: number;
	attributes: {
		name: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		property: {
			data: IProperty;
		};
		contactDetails: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
