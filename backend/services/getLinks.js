
import { axiosInstance } from '../utils/httpClient.js';
import pLimit from 'p-limit';

export async function fetchDownloadLinks(url,isDifferent,isMultiple,keys) {
    console.log('fetchDownloadLinks');
    console.log(keys);
    let fetchLimit = 10; // 0 = no limit
    let limit = pLimit(10);
    let progressCounter = 0;
    if(!isDifferent && keys === undefined){
        fetchLimit = 1;
    }
    console.log('isDifferent:', isDifferent);
    console.log('fetchLimit:', fetchLimit);
    try {

        
        if(!isMultiple){
            const newUrl = url.replace("https://github.com", "https://raw.githubusercontent.com").replace("/blob", "");
            console.log(newUrl);
            const response = await axiosInstance.get(newUrl);
            if(keys){
                const allData = await fetchData(newUrl,keys);
                return allData;
            }
            return response.data;
        }
        const response = await axiosInstance.get(url);
        const files = response.data;
        const jsonFiles = files.filter(file => file.name.endsWith('.json'));
        console.log('Antal JSON-filer:', jsonFiles.length);

        const limitedFiles = fetchLimit !== 0 ? jsonFiles.slice(0, fetchLimit) : jsonFiles;
        console.log('Antal JSON-filer efter begränsning:', limitedFiles.length);
        const allData = await Promise.all(
            limitedFiles.map(file =>
                limit(async () => {
                    const data = await fetchData(file.download_url,keys);
                    progressCounter++;
                    console.log(`Fetched ${progressCounter} / ${limitedFiles.length} files`);
                    return data;
                })
            )
        );

        const flattenedData  = allData.flat();
       /*  const roundedData  = removeDecimals(flattenedData);
        const mergedData  = combineDuplicates(roundedData);
        const sortedDataByCoordinates  = sortByXY(mergedData);
        createCsv(sortedDataByCoordinates); */
        return flattenedData;

    } catch (error) {

        console.log("Error: ", error);
        console.log("Error fetching data from: ", url);
        throw error;

    }
}


export const fetchData = async (downloadLink,keys) => {

    try {

        const response = await axiosInstance.get(downloadLink);
        if(keys){
            const getNestedValue = (obj, path) => {
                return path.split('.').reduce((current, key) => {
                    if (current && current.hasOwnProperty(key)) {
                        return current[key];
                    }
                    return undefined;
                }, obj);
            };
        
            const newData = keys.reduce((acc, key) => {
                const value = getNestedValue(response.data[0], key);
                if (value !== undefined) { 
                    acc[key] = value;
                } else {
                    console.warn(`Key "${key}" does not exist in the object.`);
                }
                return acc;
            }, {});
            return newData;
        }
        return response.data;     

    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", downloadLink);
    }
}