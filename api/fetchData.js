import axios from 'axios';
import { createCsv } from '../utils/createCsv.js';

export const fetchData = async () => {

    try {
        console.log("Fetching data...");
        const url = "https://raw.githubusercontent.com/statsbomb/open-data/refs/heads/master/data/events/19717.json";
        const response = await axios.get(url);
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
            createCsv(formattedData);

    } catch (error) {
        console.log("Error: ", error);
        console.log("Error fetching data from: ", url);
    }
}


const translateBodyPart = (id) => {
    const mapping = {
        37: "Nick",
        38: "Skott",
        70: "Övrigt",
        40: "Skott",
    };
    return mapping[id] || "Okänd";
};

// Funktion för att översätta "Shot Type"
const translateShotType = (id) => {
    const mapping = {
        61: "Hörna",
        62: "Frispark",
        87: "Öppet spel",
        88: "Straff",
    };
    return mapping[id] || "Okänt skede";
};

// Funktion för att översätta "Outcome"
const translateOutcome = (id) => {
    const mapping = {
        96: "Blockad",
        97: "Mål",
        98: "Utanför",
        99: "På mål",
        100: "På mål",
        101: "Utanför",
        115: "På mål",
        116: "På mål",
    };
    return mapping[id] || "Okänt resultat";
};