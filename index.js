import http from 'http';
import {fetchDownloadLinks } from './api/dataFetcher.js';

const port = 3000;


function startServer() {
    const server = http.createServer((req, res) => { 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    });
    
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}


async function main () {
    try {
        startServer();
        await fetchDownloadLinks();
    }
    catch (error) {
        console.error('Error initializing the application:', error);
        process.exit(1);
    }
}


main();