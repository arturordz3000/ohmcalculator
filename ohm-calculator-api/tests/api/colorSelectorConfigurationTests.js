process.env.NODE_ENV = 'test';
const request = require('supertest');

const express = require('express');
const app = express();
var router = require('../../routes/colorSelectorConfiguration');
const { assert } = require('chai');
app.use('/colorSelector/configuration', router);

describe('/colorSelector/configuration', async () => {
    it('GET responds with json', async () => {
        const response = await request(app)
            .get('/colorSelector/configuration')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        assert(response.body.length);
        const first = response.body[0];
        assert(first.name);
        assert(first.colors);
        assert(first.colors.length);
        assert(first.colors[0].rgb);
        assert(first.colors[0].value);
    });
});