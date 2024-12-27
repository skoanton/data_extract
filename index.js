import http from 'http';
import { fetchData, fetchDownloadLinks } from './api/fetchData.js';


const port = 3000;

const server = http.createServer((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


await fetchDownloadLinks();
