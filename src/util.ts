import axios from "axios";
import {load} from "cheerio"

export class Util {

    public static async convertGelToUsd(amount: number): Promise<number>{
        try {
            const currencyRequest = await  axios.get(`https://www.google.com/search?q=${amount}+GEL+to+USD+&hl=en`);
            const loaded = load(currencyRequest?.data);
    
            return parseInt(loaded.text().split('Lari =')[1].split(' ')[0].replace(',',''));
        } catch (error) {
            console.log('Currency Exchange Error -------->', error?.message);
        }
       
    }
}