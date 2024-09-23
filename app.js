import express from 'express';
import _ from "lodash";
import fs from 'fs/promises';
import {log} from "console";
const app = express();
const port = 7499;

const amn = [ {id:1,type:'gan', status:'active', active:true},{},{},{}
]

app.get('/', (req, res) => {
  
    res.send("Welcom to My Ammunition Center")
})


app.get('/amn',(req,res) =>{

})

app.get('/amn/:id',(req,res) =>{

})

app.get('/amn/summary',(req,res) =>{

})

app.patch('/amn/:id',(req,res) =>{

})

app.get('/amn',(req,res) =>{

})


app.listen(port, () => {
    log('Server is running on port ' + port + 'visit http://localhost:' + port);
});