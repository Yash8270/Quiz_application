const mysql = require('mysql');

const connection = mysql.createConnection({
      host: 'localhost',
      database: 'student',
      user: 'root',
      password:'123456'
});

connection.connect(function(error){
    if(error)
    {
        throw error;
    }
    else
    {
        console.log('Database connected');
    }
});

module.exports = connection;