import express from 'express';
import amnController from './controllers/ammunitionController.js';
import {log} from "console";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use('/amn', amnController);
const port = 7499;

app.get('/', (req, res) => {
  
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(port, () => {
    log('Server is running on port ' + port + 'visit http://localhost:' + port);
});