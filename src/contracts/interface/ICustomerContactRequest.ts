export interface ICustomerContactRequest {
    id: 1,
        attributes: {
            name: string,
            lastName: string,
            email: string,
            phoneNumber: string,
            propertyId: string,
            contactDetails: string,
            createdAt: Date,
            updatedAt: Date,
            publishedAt: Date
        }
}