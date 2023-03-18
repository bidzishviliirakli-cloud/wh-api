export interface IBlog {
	id: number;
	attributes: {
		title: string;
		text: string;
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}
