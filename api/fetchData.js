import axios from 'axios';
import { createCsv } from '../utils/createCsv.js';
import { translateBodyPart, translateShotType, translateOutcome } from '../utils/translate.js';


export const fetchDownloadLinks = async () => {
    try {
        console.log("Fetching download links...");
        const url = "https://api.github.com/repos/statsbomb/open-data/contents/data/events";
        const response = await axios.get(url);
        const files = response.data;
        const jsonFiles = files.filter(file => file.name.endsWith('.json'));
        console.log('Antal JSON-filer:', jsonFiles.length);

        let formattedData = [];
        for (const file of jsonFiles) {
            const link = file.download_url;
            console.log("Fetching data from: ", file.name);
            const data = await fetchData(link);
            formattedData = formattedData.concat(data);
        }
        createCsv(formattedData);
    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", url);
    }
}

export const fetchData = async (downloadLink) => {

    try {
        const response = await axios.get(downloadLink);
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
                Outcome: translateOutcome(event.shot.outcome.id), 
                Touch: event.shot.first_time ? 1 : 2, 
                XG: event.shot.statsbomb_xg,
            }));
            return formattedData;
            

    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", downloadLink);
    }
}