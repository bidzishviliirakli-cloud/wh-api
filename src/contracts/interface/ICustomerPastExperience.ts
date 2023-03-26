import { IStrapiImage } from "./IStrapiImage";

export interface ICustomerPastExperience {
    id: number;
    attributes: {
        title: string;
        text: string;
        stars: number;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        customerFullName: string;
        customerImage: {
            data: IStrapiImage;
        };
    }
}
