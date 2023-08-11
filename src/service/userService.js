import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from 'bcryptjs';

// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     Promise: bluebird
// });
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
});

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);;
};

module.exports = {
    createUser: async (email, password, username) => {
        let hashedPassword = hashPassword(password);
        try {
            const [rows, fields] = await connection.execute('insert into users (email, password, username) values (?, ?, ?)', [email, hashPassword, username]);
        } catch (error) {
            console.log(error);
        }
    },
    getAllUsers: async () => {
        let users = [];
        try {
            const [rows, fields] = await connection.execute('select * from users');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (id) => {
        try {
            const [rows, fields] = await connection.execute('delete from users where id = ?', [id]);
            return rows;
        } catch (error) {
            console.log(error);
        }
    }
};