const axios = require('axios'); // Find out more about axios and how it can be used.
const readline = require('readline'); // Find out more about readline and how it can be used.
require('dotenv').config();

let server;

beforeEach(() => {
    server = require('../src/expose');
});


describe('express /addNewVisitor endpoint', () => {

    it(`should submit and save the request's body to a database and return its api`, async(done) => {
        let response = await axios.post('http://localhost:1221/addNewVisitor', {
            visitorname: "KWAZI",
            assistantname: "MA",
            visitorage: "12",
            visitdate: "11/24/1997",
            visittime: "12:30:AM",
            comments: "NOTHING!!!!!!!!!"
        });
        expect(response.data).toEqual([Object({ visitorid: response.data[0].visitorid, visitorname: 'KWAZI', asssistantname: 'MA', visitorage: 12, visitdate: '1997-11-23T22:00:00.000Z', visittime: '00:30:00', comments: 'NOTHING!!!!!!!!!' })])

        done();
    });

});

describe('express /viewVisitors endpoint', () => {

    it(`should query a database for all visitors return the api of the results`, async(done) => {

        await axios.post('http://localhost:1221/addNewVisitor', {
            visitorname: "Sihle",
            assistantname: "Maphela",
            visitorage: "12",
            visitdate: "11/24/1997",
            visittime: "12:30:AM",
            comments: "NOTHING!!!!!!!!!"
        });

        await axios.post('http://localhost:1221/addNewVisitor', {
            visitorname: "Lehlohonolo",
            assistantname: "Maphela",
            visitorage: "12",
            visitdate: "11/24/1997",
            visittime: "12:30:AM",
            comments: "NOTHING!!!!!!!!!"
        });

        let viewVisitors_API = await axios.get('http://localhost:1221/viewVisitors')

        expect(viewVisitors_API.data).toEqual(
            [Object({
                    visitorid: 1,
                    visitorname: 'KWAZI',
                    asssistantname: 'MA',
                    visitorage: 12,
                    visitdate: '1997-11-23T22:00:00.000Z',
                    visittime: '00:30:00',
                    comments: 'NOTHING!!!!!!!!!'
                }),
                Object({
                    visitorid: 2,
                    visitorname: 'Sihle',
                    asssistantname: 'Maphela',
                    visitorage: 12,
                    visitdate: '1997-11-23T22:00:00.000Z',
                    visittime: '00:30:00',
                    comments: 'NOTHING!!!!!!!!!'
                }),
                Object({
                    visitorid: 3,
                    visitorname: 'Lehlohonolo',
                    asssistantname: 'Maphela',
                    visitorage: 12,
                    visitdate: '1997-11-23T22:00:00.000Z',
                    visittime: '00:30:00',
                    comments: 'NOTHING!!!!!!!!!'
                })
            ]);

        done();
    });
});

describe('express /viewVisitor:id endpoint', () => {
    it('should view a visitor with passed id from the database and return the api', async(done) => {
        const response = await axios.get("http://localhost:1221/viewVisitor1");

        expect(response.data).toEqual([Object({ visitorid: 1, visitorname: 'KWAZI', asssistantname: 'MA', visitorage: 12, visitdate: '1997-11-23T22:00:00.000Z', visittime: '00:30:00', comments: 'NOTHING!!!!!!!!!' })]);

        done();
    });
});

fdescribe('express /updateVisitor:id endpoint', () => {
    it('should view a visitor with passed id from the database and return the api', async(done) => {
        const response = await axios.patch("http://localhost:1221/updateVisitor1", {
            visitorname: 'Xoliswa',
            asssistantname: 'Maphela',
            visitorage: 12,
            visitdate: '1997-11-23T22:00:00.000Z',
            visittime: '00:30:00',
            comments: 'NOTHING!!!!!!!!!'
        });

        expect(response.data).toEqual([Object({ visitorid: 1, visitorname: 'Xoliswa', asssistantname: 'Maphela', visitorage: 12, visitdate: '1997-11-23T22:00:00.000Z', visittime: '00:30:00', comments: 'NOTHING!!!!!!!!!' })]);

        done();
    });
});

// xdescribe('express /deleteVisitor:id endpoint', () => {


//     it('should delete a visitor with passed id from the database and return the api', async(done) => {
//         const response = await axios.delete("http://localhost:1221/deleteVisitor1");

//         expect(response.config.url).toEqual('http://localhost:1221/deleteVisitor1');
//         expect(response.config.method).toEqual('delete');
//         expect(response.data.command).toEqual('DELETE');
//         expect(response.data.rowCount).toEqual(1);

//         done();
//     });

// });

// xdescribe('express /deleteAllVisitors endpoint', () => {
//     axios.post('http://localhost:1221/addNewVisitor', {
//         visitorname: "Sihle",
//         assistantname: "Maphela",
//         visitorage: "12",
//         visitdate: "11/24/1997",
//         visittime: "12:30:AM",
//         comments: "NOTHING!!!!!!!!!"
//     });

// });