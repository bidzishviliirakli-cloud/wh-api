import { IDeveloper } from "./IDeveloper";
import { IProject } from "./IProject";
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
		project: {
			data: IProject;
		};
		developer: {
			data: IDeveloper;
		};
		contactDetails: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
