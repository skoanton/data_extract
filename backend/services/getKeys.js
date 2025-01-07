import { getDownloadLinks } from "../controllers/fetchController.js";
import { fetchDownloadLinks } from "./getLinks.js";
import { get_all_json_keys } from "../utils/helpers.js";
export async function fetchKeys(url,isDifferent) {
    console.log('fetchKeys');
    try {
        console.log('getKeys');
        const data = await fetchDownloadLinks(url,isDifferent);
        console.log(data[0]);
        let keys = [];
        console.log(Object.keys(data[0]));
        
        return Object.keys(data[0]);
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}
