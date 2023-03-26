export interface ICustomerContactRequest {
	id: number;
	attributes: {
		name: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		propertyId: string;
		contactDetails: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
