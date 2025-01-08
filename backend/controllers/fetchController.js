import {fetchDownloadLinks} from '../services/getLinks.js';
import { fetchKeys } from '../services/getKeys.js';


export const getDownloadLinks = async (req, res) => {
    const {url} = req.query;
    console.log(url);
    try {
        console.log('getDownloadLinks');
        const data = await fetchDownloadLinks(url);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getKeys = async (req, res) => {
    const {url} = req.query;
    const isDifferent = req.query.isDifferent === 'true';

    if(url === undefined){
        res.status(400).json({ error: 'Bad Request' });
    }

    console.log(url,isDifferent);
    try {
        console.log('getKeys');
        const data = await fetchKeys(url,isDifferent);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}