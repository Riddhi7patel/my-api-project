const mysql = require('mysql');

const connection = mysql.createConnection({
  port: 3000,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Mock_data'
});

function getAllCharacters(callback) {
  connection.query('SELECT * FROM characters', (error, results) => {
    if (error) {
      return callback(error);
    }

    return callback(null, results);
  });
}

module.exports = {
  getAllCharacters,
};
