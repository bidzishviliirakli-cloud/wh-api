export interface IFaq {
    id: number,
    attributes: {
        question: string,
        answer: string,
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date
    }
}