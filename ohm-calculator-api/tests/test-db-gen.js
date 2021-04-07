function createTestDb() {
    var sqlite3 = require('sqlite3').verbose();
    var fs = require('fs');

    if (fs.existsSync('test.db')) {
        fs.unlinkSync('test.db');
    }

    var dbServiceModule = require('../modules/dbServiceModule');

    var db = new sqlite3.Database('test.db');

    console.log('Creating database...');
    const service = dbServiceModule.init(db);

    console.log('Creating Colors table and inserting data...');

    service.createTable('Colors', [
    {name: 'color_id', type: 'INTEGER PRIMARY KEY'},
    {name: 'rgb', type: 'TEXT'},
    {name: 'value_description', type: 'TEXT'},
    {name: 'value_number', type: 'REAL'},
    ]);

    // Band colors
    service.insert('Colors', [1, 'rgb(0, 0, 0)', '0', 0 ]);
    service.insert('Colors', [2, 'rgb(153, 117, 82)', '1', 1 ]);
    service.insert('Colors', [3, 'rgb(255, 57, 57)', '2', 2 ]);
    service.insert('Colors', [4, 'rgb(255, 165, 74)', '3', 3 ]);
    service.insert('Colors', [5, 'rgb(255, 255, 122)', '4', 4 ]);
    service.insert('Colors', [6, 'rgb(137, 255, 137)', '5', 5 ]);
    service.insert('Colors', [7, 'rgb(72, 136, 242)', '6', 6 ]);
    service.insert('Colors', [8, 'rgb(240, 144, 246)', '7', 7 ]);
    service.insert('Colors', [9, 'rgb(128, 128, 128)', '8', 8 ]);
    service.insert('Colors', [10, 'rgb(255, 255, 255)', '9', 9]);

    // Multiplier Colors
    service.insert('Colors', [11, 'rgb(0, 0, 0)', '1Ω', 1 ]);
    service.insert('Colors', [12, 'rgb(153, 117, 82)', '10Ω', 10 ]);
    service.insert('Colors', [13, 'rgb(255, 57, 57)', '100Ω', 100 ]);
    service.insert('Colors', [14, 'rgb(255, 165, 74)', '1KΩ', 1000 ]);
    service.insert('Colors', [15, 'rgb(255, 255, 122)', '10KΩ', 10000 ]);
    service.insert('Colors', [16, 'rgb(137, 255, 137)', '100KΩ', 100000 ]);
    service.insert('Colors', [17, 'rgb(72, 136, 242)', '1MΩ', 1000000 ]);
    service.insert('Colors', [18, 'rgb(240, 144, 246)', '10MΩ', 10000000 ]);
    service.insert('Colors', [19, 'rgb(205, 153, 51)', '0.1', 0.1]);
    service.insert('Colors', [20, 'rgb(204, 204, 204)', '0.01', 0.01]);

    // Tolerance Colors
    service.insert('Colors', [21, 'rgb(153, 117, 82)', '±1%', 1 ]);
    service.insert('Colors', [22, 'rgb(255, 57, 57)', '±2%', 2 ]);
    service.insert('Colors', [23, 'rgb(137, 255, 137)', '±0.5%', 0.5 ]);
    service.insert('Colors', [24, 'rgb(72, 136, 242)', '±0.25%', 0.25 ]);
    service.insert('Colors', [25, 'rgb(240, 144, 246)', '±0.10%', 0.1 ]);
    service.insert('Colors', [26, 'rgb(128, 128, 128)', '±0.05%', 0.05 ]);
    service.insert('Colors', [27, 'rgb(205, 153, 51)', '±5%', 5 ]);
    service.insert('Colors', [28, 'rgb(204, 204, 204)', '±10%', 10]);

    console.log('Colors table created!');

    console.log('Creating ColorSelectorConfigurations table and inserting data...');

    service.createTable('ColorSelectorConfigurations', [
    {name: 'color_selector_configuration_id', type: 'INTEGER PRIMARY KEY'},
    {name: 'name', type: 'TEXT'}
    ]);

    service.insert('ColorSelectorConfigurations', [1, 'First Band']);
    service.insert('ColorSelectorConfigurations', [2, 'Second Band']);
    service.insert('ColorSelectorConfigurations', [3, 'Multiplier']);
    service.insert('ColorSelectorConfigurations', [4, 'Tolerance']);

    console.log('ColorSelectorConfigurations table created!');

    console.log('Creating ColorSelectorConfigurations_Colors table and inserting data...');

    service.createTable('ColorSelectorConfigurations_Colors', [
    {name: 'color_selector_configuration_id', type: 'INTEGER'},
    {name: 'color_id', type: 'INTEGER'},
    ]);

    for (let i = 1; i <= 10; i++) {
    service.insert('ColorSelectorConfigurations_Colors', [1, i]);
    service.insert('ColorSelectorConfigurations_Colors', [2, i]);
    }

    for (let i = 11; i <= 20; i++) {
    service.insert('ColorSelectorConfigurations_Colors', [3, i]);
    }

    for (let i = 21; i <= 28; i++) {
    service.insert('ColorSelectorConfigurations_Colors', [4, i]);
    }

    console.log('ColorSelectorConfigurations_Colors table created!');

    console.log('Creating ResistorDefaults table and inserting data...');

    service.createTable('ResistorDefaults', [
    {name: 'resistor_default_id', type: 'INTEGER PRIMARY KEY'},
    {name: 'position', type: 'TEXT'},
    {name: 'color_id', type: 'INTEGER'}
    ]);

    service.insert('ResistorDefaults', [1, '20px', 1]);
    service.insert('ResistorDefaults', [2, '40px', 1]);
    service.insert('ResistorDefaults', [3, '60px', 11]);
    service.insert('ResistorDefaults', [4, '180px', 27]);

    console.log('ResistorDefaults table created!');

    service.close();

    console.log('Database created successfully!');
}

module.exports = {
    createTestDb: createTestDb
}