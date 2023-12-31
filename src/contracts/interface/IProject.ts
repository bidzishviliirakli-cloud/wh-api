import { ICity } from "./ICity";
import { IDeveloper } from "./IDeveloper";
import { IStrapiImage } from "./IStrapiImage";

export interface IProject{
    id: number;
    attributes: {
        address: string;
        cadastralCode: string;
        city: {
            data: ICity
        };
        communications: string;
        condintionOfAppartments: string;
        constructionTechnology: string;
        cover: {
            data: IStrapiImage
        };
        description: string;
        developer:{
            data: IDeveloper
        };
        elevator: string;
        gallery:{
            data: IStrapiImage[];
        } 
        infrastructure: string;
        numberOfAppartments: number;
        numberOfFloor: number;
        parking: string;
        pricesFrom: number;
        security: string;
        squareMeterPrice: number;
        title: string;
        createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
    }
}