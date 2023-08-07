import userService from '../service/userService';

module.exports = {
    hello: (req, res) => {
        return res.render('home.ejs');
    },
    handleUserPage: (req, res) => {
        return res.render('user.ejs');
    },
    handleCreateUser: (req, res) => {
        const { email, password, username } = req.body;
        userService.createUser(email, password, username);

        return res.render('user.ejs');
    }
};