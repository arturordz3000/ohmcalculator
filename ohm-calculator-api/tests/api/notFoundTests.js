process.env.NODE_ENV = 'test';
const request = require('supertest');
const notFoundHandler = require('../../handlers/notFoundHandler');

const express = require('express');
const app = express();
const { assert } = require('chai');
app.use('*', notFoundHandler.handle);

describe('Not Found', async () => {
    it('Returns 404 error code and a json with the error', async () => {
        const response = await request(app)
            .get('/calculator?value=10&multiplier=1&tolerance=5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404);

        const result = response.body.error;
        assert.strictEqual(result, 'A route for the URL /calculator?value=10&multiplier=1&tolerance=5 could not be found.');
    });
});