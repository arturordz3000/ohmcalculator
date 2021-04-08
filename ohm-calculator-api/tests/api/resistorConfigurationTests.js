process.env.NODE_ENV = 'test';
const request = require('supertest');

const express = require('express');
const app = express();
var router = require('../../routes/resistorConfiguration');
const { assert } = require('chai');
app.use('/resistor/configuration', router);

describe('/resistor/configuration', async () => {
    it('GET responds with json', async () => {
        const response = await request(app)
            .get('/resistor/configuration')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        assert(response.body.length);
        const first = response.body[0];
        assert(first.rgb);
        assert(first.position);
        assert(first.value);
        assert(first.value.description);
    });

    it('should return 405 method not allowed', async() => {
        const response = await request(app)
            .post('/resistor/configuration')
            .set('Accept', 'application/json')
            .expect(405);

        assert.strictEqual(response.body.error, 'Method Not Allowed.');
    });
});