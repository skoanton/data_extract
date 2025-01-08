
import { fetchDownloadLinks } from "./getLinks.js";
import {extractKeys} from "../utils/helpers.js";

export async function fetchKeys(url,isDifferent) {
    console.log('fetchKeys');
    try {
        console.log('getKeys');
        const data = await fetchDownloadLinks(url,isDifferent);
        let keys = []
        for(const d of data){
            const key = extractKeys(d);
            keys.push(key);
        }          
        const uniqueKeys = [...new Set(keys.flat())];
        return uniqueKeys;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}
