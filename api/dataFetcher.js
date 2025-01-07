import { createCsv } from '../utils/createCsv.js';
import { translateBodyPart, translateShotType } from '../utils/translate.js';
import { combineDuplicates } from '../utils/combine.js';
import { sortByXY,removeDecimals } from '../utils/sort.js';
import { axiosInstance } from '../utils/httpClient.js';
import pLimit  from 'p-limit';


export const fetchDownloadLinks = async () => {
    const LIMIT = 0; // 0 = no limit
    const limit = pLimit(10);
    let progressCounter = 0;
    try {

        const url = "https://api.github.com/repos/statsbomb/open-data/contents/data/events";
        const response = await axiosInstance.get(url);
        const files = response.data;
        const jsonFiles = files.filter(file => file.name.endsWith('.json'));
        console.log('Antal JSON-filer:', jsonFiles.length);

        const limitedFiles = LIMIT !== 0 ? jsonFiles.slice(0, LIMIT) : jsonFiles;

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
        const roundedData  = removeDecimals(flattenedData);
        const mergedData  = combineDuplicates(roundedData);
        const sortedDataByCoordinates  = sortByXY(mergedData);

        createCsv(sortedDataByCoordinates);

    } catch (error) {

        console.log("Error: ", error);
        console.log("Error fetching data from: ", url);

    }
}

export const fetchData = async (downloadLink) => {

    try {

        const response = await axiosInstance.get(downloadLink);
        const formattedData = response.data
            .filter(event => 
                event.shot &&
                ["Corner", "Free Kick", "Open Play", "Penalty"].includes(event.shot.type.name)
            )
            .map(event => ({
                X: event.location[0],
                Y: event.location[1],
                Avslut: translateBodyPart(event.shot.body_part.id),
                Skede: translateShotType(event.shot.type.id), 
                Touch: event.shot.first_time ? 1 : 2, 
                XG: event.shot.statsbomb_xg,
            }));
            return formattedData;
            

    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", downloadLink);
    }
}