const dbConfigJson = require('../config/database.json');
const { Pool } = require('pg');

const pool = new Pool({
    user: dbConfigJson.user,
    host: dbConfigJson.host,
    database: dbConfigJson.database,
    password: dbConfigJson.password,
    port: dbConfigJson.port,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on client', err);
    process.exit(-1);
});

module.exports = pool;