import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);;
};

module.exports = {
    createUser: (email, password, username) => {
        let hashedPassword = hashPassword(password);
        connection.query('insert into users (email, password, username) values (?, ?, ?)', [email, hashPassword, username], function (err, results, fields) {

        });
    },
    getAllUsers: () => {
        let users = [];
        connection.query('select * users', function (err, results, fields) {

        });
    }
};