process.env.NODE_ENV = 'test';
const request = require('supertest');

const express = require('express');
const app = express();
var router = require('../../routes/calculator');
const { assert } = require('chai');
app.use('/calculator', router);

describe('/calculator?value=[value]&multiplier=[multiplier]&tolerance=[tolerance]', async () => {
    it('GET responds with json', async () => {
        const response = await request(app)
            .get('/calculator?value=10&multiplier=1&tolerance=5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        const result = response.body.result;
        assert.strictEqual(result, '10 Ohms ±5%');
    });

    it('GET responds 400 Bad Request when there are missing parameters', async () => {
        const expectedMessage = 'There are missing parameters.';

        let response = await request(app)
            .get('/calculator?value=10&tolerance=5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        let result = response.body.error;
        assert.strictEqual(result, expectedMessage);

        response = await request(app)
            .get('/calculator?multiplier=1&tolerance=5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        result = response.body.error;
        assert.strictEqual(result, expectedMessage);

        response = await request(app)
            .get('/calculator?value=10&multiplier=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        result = response.body.error;
        assert.strictEqual(result, expectedMessage);
    });

    it('should return 405 method not allowed', async() => {
        const response = await request(app)
            .post('/calculator?value=10&multiplier=1&tolerance=5')
            .set('Accept', 'application/json')
            .expect(405);

        assert.strictEqual(response.body.error, 'Method Not Allowed.');
    });
});

describe('/calculator/:value/:multiplier/:tolerance', async () => {
    it('GET responds with json', async () => {
        const response = await request(app)
            .get('/calculator/10/1/5')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        const result = response.body.result;
        assert.strictEqual(result, '10 Ohms ±5%');
    });

    it('should return 405 method not allowed', async() => {
        const response = await request(app)
            .post('/calculator/10/1/5')
            .set('Accept', 'application/json')
            .expect(405);

        assert.strictEqual(response.body.error, 'Method Not Allowed.');
    });
});