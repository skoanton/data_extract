import http from 'http';
import {fetchDownloadLinks } from './api/dataFetcher.js';
import express from 'express';
import router from './routes/routes.js';
const app = express();
const port = 5000;
import cors from 'cors';
const corsOptions = {
	origin: 'http://localhost:3000', // Allow requests from your frontend origin
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use('/api', router);