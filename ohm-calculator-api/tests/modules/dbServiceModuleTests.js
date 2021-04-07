var dbServiceModule = require('../../modules/dbServiceModule');
var assert = require('assert');

describe('Db Service Module', function() {
    it('should initialize service with existing database instance', function() {
        const db = {};
        const service = dbServiceModule.init(db);
        assert.deepStrictEqual(db, service.db);
    });

    it('should initialize service and create new database instance', function() {
        const service = dbServiceModule.init();
        assert(service.db);
        service.db.close();
    });

    it('should create table', function(done) {
        const mockDb = {
            serialize: (callback) => callback(),
            run: (statement) => {
                const expected = 'CREATE TABLE test (prop1 INTEGER, prop2 TEXT, prop3 NUMERIC, prop4 REAL, prop5 BLOB)';
                assert.strictEqual(statement, expected);
                done();
            }
        }
        const service = dbServiceModule.init(mockDb);

        service.createTable('test', [
            {name: 'prop1', type: 'INTEGER'},
            {name: 'prop2', type: 'TEXT'},
            {name: 'prop3', type: 'NUMERIC'},
            {name: 'prop4', type: 'REAL'},
            {name: 'prop5', type: 'BLOB'},
        ]);
    });

    it('should insert into table', function(done) {
        const mockValues = [1, 'hello world', 1.5, 1.0, 'blob'];
        
        const mockDb = {
            testValues: [],
            serialize: (callback) => callback(),
            prepare: (statement) => {
                const expected = 'INSERT INTO test VALUES (?, ?, ?, ?, ?)';
                assert.strictEqual(statement, expected);
                return {
                    run: (values) => {
                        assert.strictEqual(values, mockValues);
                    },
                    finalize: () => done()
                }
            }
        }

        const service = dbServiceModule.init(mockDb);

        service.insert('test', mockValues);
    });

    it('should query database with successful response', function() {
        const mockQuery = 'SELECT rowid AS id, info FROM test';
        const expectedResponse = [{id: 1, info: 'good'}, {id: 2, info: 'test'}];

        const assertValues = (expected, actual) => {
            assert(expected.length === actual.length);
            for (let i = 0; i < expected.length; i++) {
                assert.strictEqual(expected[i], actual[i]);
            }
        }
        
        const testValues = [];

        const mockDb = {
            serialize: (callback) => callback(),
            all: (query, callback) => {
                assert.strictEqual(mockQuery, query);
                callback(null, expectedResponse)
            }
        }

        const service = dbServiceModule.init(mockDb);

        service.query(mockQuery, (err, rows) => {
            assert.strictEqual(rows, expectedResponse)
        });
    });
});