import {fetchDownloadLinks} from '../services/getLinks.js';
import { fetchKeys } from '../services/getKeys.js';


export const getDownloadLinks = async (req, res) => {
    const {url,keys} = req.query;
    const isDifferent = req.query.isDifferent === 'true';
    const isMultiple = req.query.isMultiple === 'true';

    if(url === undefined){
        res.status(400).json({ error: 'Bad Request, send URL param' });
    }
    console.log(url);
    try {
        const data = await fetchDownloadLinks(url,isDifferent,isMultiple,keys);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getKeys = async (req, res) => {
    const {url} = req.query;
    const isDifferent = req.query.isDifferent === 'true';
    const isMultiple = req.query.isMultiple === 'true';
    if(url === undefined){
        res.status(400).json({ error: 'Bad Request' });
    }

    console.log(url,isDifferent);
    try {
        console.log('getKeys');
        const data = await fetchKeys(url,isDifferent,isMultiple);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}