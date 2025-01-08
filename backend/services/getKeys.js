
import { fetchDownloadLinks,fetchData } from "./getLinks.js";
import {extractKeys} from "../utils/helpers.js";

export async function fetchKeys(url,isDifferent,isMultiple) {


    try {
        
        const data = await fetchDownloadLinks(url,isDifferent,isMultiple);

        let keys = []
        if(isMultiple){
           
            for(const d of data){
                const key = extractKeys(d);
                keys.push(key);
            }          
        }
        else{
            const key = extractKeys(data[0]);
            keys.push(key);
        }
        const uniqueKeys = [...new Set(keys.flat())];
        return uniqueKeys;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}
