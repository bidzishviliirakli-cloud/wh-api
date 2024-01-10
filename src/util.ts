// import axios from "axios";
// import {load} from "cheerio"

export class Util {
	public static convertGelToUsd(amount: number): number {
		return parseInt((amount / this.getConversionRate()).toFixed());
	}

	public static isNull(value: string): boolean {
		return (
			value === "undefined" || value === "null" || value?.length === 0 || value === null || value === undefined
		);
	}

	private static getConversionRate() {
		//TODO: get proper conversion rate

		// try {
		//     const currencyRequest = await  axios.get(`https://www.google.com/search?q=${amount}+GEL+to+USD+&hl=en`);
		//     const loaded = load(currencyRequest?.data);

		//     return parseInt(loaded.text().split('Lari =')[1].split(' ')[0].replace(',',''));
		// } catch (error) {
		//     console.log('Currency Exchange Error -------->', error?.message);
		// }

		return 2.7;
	}
}
