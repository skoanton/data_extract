import axios from 'axios';
import { createCsv } from '../utils/createCsv.js';
import { translateBodyPart, translateShotType, translateOutcome } from '../utils/translate.js';
import { combineDuplicates } from '../utils/combine.js';
import { sortByXY,removeDecimals } from '../utils/sort.js';
import dotenv from 'dotenv';

dotenv.config();
const axiosInstance = axios.create({
    headers: {
        Authorization: `token ${process.env.PERSONAL_GITHUB_TOKEN}`,
    }
});

export const fetchDownloadLinks = async () => {
    const LIMIT = 0; // 0 = no limit
    let progressCounter = 0;
    try {
        const url = "https://api.github.com/repos/statsbomb/open-data/contents/data/events";
        const response = await axiosInstance.get(url);
        const files = response.data;
        const jsonFiles = files.filter(file => file.name.endsWith('.json'));
        console.log('Antal JSON-filer:', jsonFiles.length);
        const limitedFiles = LIMIT !== 0 ? jsonFiles.slice(0, LIMIT) : jsonFiles;
        const allData = await Promise.all(
            limitedFiles.map(async (file) => {
                const data = await fetchData(file.download_url);
                progressCounter++;
                console.log(`Fetched ${progressCounter} / ${limitedFiles.length} files`);
                return data;
            })
        );

        const formattedData = allData.flat();
        const dataWithNoDecimals = removeDecimals(formattedData);
        const newData = combineDuplicates(dataWithNoDecimals);
        const sortedData = sortByXY(newData);
        createCsv(sortedData); 
    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", url);
    }
}

export const fetchData = async (downloadLink) => {

    try {
        const response = await axiosInstance.get(downloadLink);
        const data = response.data;
        const formattedData = data
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