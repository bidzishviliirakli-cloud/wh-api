import axios from "axios";
import {load} from "cheerio"

export class Util {

    public static async convertUsdToGel(amount: number): Promise<number>{
        try {
            const currencyRequest = await  axios.get(`https://www.google.com/search?q=${amount}+USD+to+GEL+&hl=en`);
            const loaded = load(currencyRequest?.data);
    
            return parseInt(loaded.text().split('United States Dollars in Georgian Lari today is')[1].split('GEL')[0].trim().replace(',',''));
        } catch (error) {
            console.log('Currency Exchange Error -------->', error?.message);
        }
       
    }
}