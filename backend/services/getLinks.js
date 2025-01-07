import { axiosInstance } from '../utils/httpClient.js';
import pLimit from 'p-limit';

export async function fetchDownloadLinks(url,isDifferent) {
    console.log('fetchDownloadLinks');
    
    let fetchLimit = 0; // 0 = no limit
    let limit = pLimit(10);
    let progressCounter = 0;
    if(!isDifferent){
        fetchLimit = 1;
    }
    console.log('isDifferent:', isDifferent);
    console.log('fetchLimit:', fetchLimit);
    try {

        const response = await axiosInstance.get(url);
        const files = response.data;
        const jsonFiles = files.filter(file => file.name.endsWith('.json'));
        console.log('Antal JSON-filer:', jsonFiles.length);

        const limitedFiles = fetchLimit !== 0 ? jsonFiles.slice(0, fetchLimit) : jsonFiles;
        console.log('Antal JSON-filer efter begränsning:', limitedFiles.length);
        const allData = await Promise.all(
            limitedFiles.map(file =>
                limit(async () => {
                    const data = await fetchData(file.download_url);
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


export const fetchData = async (downloadLink) => {

    try {

        const response = await axiosInstance.get(downloadLink);
        return response.data;     

    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", downloadLink);
    }
}