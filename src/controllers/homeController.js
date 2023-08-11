import userService from '../service/userService';

module.exports = {
    hello: (req, res) => {
        return res.render('home.ejs');
    },
    handleUserPage: async (req, res) => {
        let users = await userService.getAllUsers();

        return res.render('user.ejs', { users });
    },
    handleCreateUser: (req, res) => {
        const { email, password, username } = req.body;
        userService.createUser(email, password, username);

        return res.redirect('/user');
    },
    handleDeleteUser: (req, res) => {
        const { id } = req.params;
        userService.deleteUser(id);

        return res.redirect('/user');
    }
};