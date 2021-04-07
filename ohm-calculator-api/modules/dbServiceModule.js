var sqlite3 = require('sqlite3').verbose();

function createTable(tableName, properties, deleteIfExists) {
    this.db.serialize(() => {
        properties = properties.map((value) => value.name + ' ' + value.type);
        const tableProperties = properties.join(', ');
        this.db.run('CREATE TABLE ' + tableName + ' (' + tableProperties + ')');
    });
}

function insert(table, values) {
    this.db.serialize(() => {
        const valuesPattern = values.map(() => '?').join(', ');
        var statement = this.db.prepare('INSERT INTO ' + table + ' VALUES (' + valuesPattern + ')');
        statement.run(values);
        statement.finalize();
    });
}

function query(sql, callback) {
    this.db.serialize(() => {
        this.db.each(sql, callback);
    });
}

function close() {
    this.db.close();
}

module.exports = {
    init: function(db) {
        return {
            db: db ? db : new sqlite3.Database('default.db'),
            createTable: createTable,
            insert: insert,
            query: query,
            close: close
        }
    }
}