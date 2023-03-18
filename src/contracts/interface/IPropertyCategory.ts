export interface IPropertyCategory {
    id: number,
    attributes: {
        title: string;
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date
    }
}