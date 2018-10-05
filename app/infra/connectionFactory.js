var mysql = require('mysql');
function createDbConnection() {
    return  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_js'
    });
}

module.exports = function () {
    return createDbConnection;
}