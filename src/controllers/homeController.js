import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

module.exports = {
    hello: (req, res) => {
        return res.render('home.ejs');
    },
    handleUserPage: (req, res) => {
        return res.render('user.ejs');
    },
    handleCreateUser: (req, res) => {
        const { email, password, username } = req.body;
        connection.query('insert into users (email, password, username) values (?, ?, ?)', [email, password, username], function (err, results, fields) {

        });

        return res.render('user.ejs');
    }
};