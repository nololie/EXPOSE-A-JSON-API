const axios = require('axios'); // Find out more about axios and how it can be used.
const readline = require('readline'); // Find out more about readline and how it can be used.

let server;


describe('express new_visit endpoint', () => {
    beforeEach(() => {
        server = require('../src/expose');
    });

    afterEach(() => {
        server.close();
    });

    const fixture = require('./fixture');

    it('should return an html form', async(done) => {
        try {
            const html = await axios.get("http://localhost:1221/new_visit");
            expect(html.data).toEqual(fixture);
        } catch (err) {
            console.log(err);
        }

        done();
    });
});

describe('express addnew_visit endpoint', () => {
    beforeEach(() => {
        server = require('../src/express');
    });

    afterEach(() => {
        server.close();
    });

    it('should submit and save the form data to a database', async(done) => {
        try {
            // This test will not work because "http://localhost:1221/addnew_visit" 
            // will not send any data to the database since there is no form filling and submition using the "submit button" in these tests. 
            // Resulting in a connection error.
            // HOW DO I DO THIS TEST
            const html = await axios.get("http://localhost:1221/addnew_visit");
            expect(html.data).toEqual(fixture2);
        } catch (err) {
            console.log(err);
        }

        done();
    });
});