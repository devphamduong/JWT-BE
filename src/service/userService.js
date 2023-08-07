import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from 'bcryptjs';

// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     Promise: bluebird
// });

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
    getAllUsers: async () => {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jwt',
            Promise: bluebird
        });
        let users = [];
        try {
            const [rows, fields] = await connection.execute('select * from users');
            return rows;
        } catch (error) {
            console.log(error);
        }
    }
};