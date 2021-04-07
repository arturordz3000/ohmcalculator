process.env.NODE_ENV = 'test';
const request = require('supertest');

const testDbGenerator = require('../test-db-gen');
testDbGenerator.createTestDb();

const express = require('express');
const app = express();
var router = require('../../routes/resistorCofiguration');
const { expect, assert } = require('chai');
app.use('/resistor/configuration', router);

describe('/resistor/configuration', async () => {
    it('GET responds with json', async () => {
        const response = await request(app)
            .get('/resistor/configuration')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        assert(response.body.length);
    });
});