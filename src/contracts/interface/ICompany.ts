export interface ICompany {
	id: string;
	attributes: {
		title: string;
		address: string;
		email: string;
		phoneNumber: string;
		about: string;
		ceo: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
