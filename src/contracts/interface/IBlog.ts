import { IAgent } from "./IAgent";
import { IStrapiImage } from "./IStrapiImage";

export interface IBlog {
	id: number;
	attributes: {
		title: string;
		description: string;
		header1: string,
		header2: string,
		header3: string,
		header4: string,
		header5: string,
		header6: string,
		text1: string,
		text2: string,
		text3: string,
		text4: string,
		text5: string,
		text6: string,
		cover:{
			data:IStrapiImage;
		} ;
		gallery:{
			data: IStrapiImage[];
		};
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
		agent: {
			data:IAgent; 
		} ;
	};
}
