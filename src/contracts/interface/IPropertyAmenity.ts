import { IStrapiImage } from "./IStrapiImage";

export interface IPropertyAmenity {
    id: number,
    attributes: {
        title: string;
        icon: IStrapiImage;
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date
    }
}