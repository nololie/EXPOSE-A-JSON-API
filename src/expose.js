'use strict';

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 1221;

const { Client } = require("pg");
const client = new Client();
client.connect();

// app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'views/'))

app.use(express.urlencoded({ extended: true }));
// app.use(express.static('.'));
app.use(express.json());

const addNewVisitor = async(name, assistant_name, age, visit_date, visit_time, comments) => {
    try {
        let result = await client.query(
            `INSERT INTO visitors(
                visitorName, 
                asssistantName, 
                visitorAge, 
                visitDate, 
                visitTime, 
                comments
            )
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;`, [name, assistant_name, age, visit_date, visit_time, comments]
        );
        return result.rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

app.post('/addNewVisitor', async(req, res) => {

    let record = await addNewVisitor(req.body.visitorname, req.body.assistantname, req.body.visitorage, req.body.visitdate, req.body.visittime, req.body.comments)

    res.send(JSON.stringify(record));

    res.end();
});

app.delete('/deleteVisitor:id', async(req, res) => {

    let record = await client.query(`DELETE FROM visitors WHERE visitorid=${req.params.id}`)

    res.send(record);

    res.end();
});

app.delete('/deleteAllVisitors', async(req, res) => {

    let record = await client.query(`DELETE FROM visitors`)

    res.send(record);

    res.end();
});

app.get('/viewVisitors', async(req, res) => {

    let record = await client.query(`SELECT * FROM visitors`)

    res.send(record.rows);

    res.end();
});

app.get('/viewVisitor:id', async(req, res) => {

    let record = await client.query(`SELECT * FROM visitors WHERE visitorid=${req.params.id}`)

    res.send(record.rows);

    res.end();
});

app.put('/updateVisitor:id', async(req, res) => {
    console.log("I am the error: ", req.body.visitorage, req.body.visitorname);

    // let record = await client.query(`UPDATE visitors SET visitorname='${req.body.visitorname}', asssistantname='${req.body.asssistantname}', visitorage='${req.body.visitorage}', visitdate='${req.body.visitdate}', visittime='${req.body.visittime}', comments='${req.body.comments}' WHERE visitorid=${req.params.id}`);

    // res.send(record.rows);

    // res.end();
});

let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;