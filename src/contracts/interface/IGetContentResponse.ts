import { IAgent } from "./IAgent";
import { IBlog } from "./IBlog";
import { IProperty } from "./IProperty";

export interface IGetContentResponse {
	data: IAgent | Array<IAgent> | IProperty | Array<IProperty> | IBlog | Array<IBlog>;
}
