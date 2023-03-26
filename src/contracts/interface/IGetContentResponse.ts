import { IAgent } from "./IAgent";
import { IBlog } from "./IBlog";
import { ICompany } from "./ICompany";
import { ICustomerContactRequest } from "./ICustomerContactRequest";
import { ICustomerPastExperience } from "./ICustomerPastExperience";
import { IDeveloper } from "./IDeveloper";
import { IFaq } from "./IFaq";
import { IProperty } from "./IProperty";

export interface IGetContentResponse {
	data: IAgent
	| Array<IAgent>
	| IProperty
	| Array<IProperty>
	| IBlog
	| Array<IBlog>
	| ICompany
	| Array<ICompany>
	| ICustomerContactRequest
	| Array<ICustomerContactRequest>
	| ICustomerPastExperience
	| Array<ICustomerPastExperience>
	| IDeveloper
	| Array<IDeveloper>
	| IFaq
	| Array<IFaq>
}
