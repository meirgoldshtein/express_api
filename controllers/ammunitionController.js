import e from "express";
import _ from "lodash";
import fs from 'fs/promises';
import {log} from "console";
import {v4} from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = e.Router();

const read = async (fileName) => {
    try {
        const data = await fs.readFile(fileName, 'utf8');
        return data;
    } catch (err) {
        log(chalk.red(err));
    }
}

router.get('/', async(req,res) => {
    try{
        const data = await read('./data.json');
        res.json(JSON.parse(data))
    }
    catch(err){
        res.status(500).json({
            err: true ,
            message : err
        })
    }
})


router.get('/summary', async (req, res) => {
    try {
        // המרת הסטרינג שהתקבל לגייסון כדי שיהיה אפשר לרוץ עליו
        const data = JSON.parse(await read('./data.json'));
        if (!data) throw new Error('Data not found');

        const result = data.reduce((obj, curr) => {
            obj.sum++;
            curr.active ? obj.actives++ : obj.actives;
            curr.status ? obj.in_stock++ : obj.in_stock;
            return obj
        },
            {
                sum: 0,
                actives: 0,
                in_stock: 0
            })
        res.json(result)
    }
    catch (err) {
        res.status(500).json({
            err: true,
            message: err
        })
    }
})


router.get('/:id', async (req, res) => {
    try {
        // המרת הסטרינג שהתקבל לגייסון כדי שיהיה אפשר לרוץ עליו
        const data = JSON.parse(await read('./data.json'));
        const obj = data ? data.find(amn => amn.id == req.params.id) : null;
        if (!obj) throw new Error('Amn not found');
        res.json(obj)
    }
    catch (err) {
        res.status(500).json({
            err: true,
            message: err
        })
    }
})


router.patch('/:id', async (req, res) => {
    try {

        // המרת הסטרינג שהתקבל לגייסון כדי שיהיה אפשר לרוץ עליו
        const data = JSON.parse(await read('./data.json'));
        const index = data ? data.findIndex(amn => amn.id == req.params.id) : null;
        if (index == -1) throw new Error('Amn not found');
        const newObj = { ...data[index], ...req.body, id: data[index].id }
        data[index] = newObj
        await fs.writeFile('./data.json', JSON.stringify(data, null, 2))
        res.send(newObj)

    }
    catch (err) {
        res.status(500).json({
            err: true,
            message: err
        })
    }
})


router.post('/', async (req, res) => {
    try {
        const data = JSON.parse(await read('./data.json'))
        const newObj = { ...req.body, id: v4() }
        data.push(newObj)
        await fs.writeFile('./data.json', JSON.stringify(data, null, 2))
        res.send(newObj)
    } catch (err) {
        log(err);
        res.status(500).json({
            err: true,
            message: err
        })
    }
})

export default router