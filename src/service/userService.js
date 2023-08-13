import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);;
};

module.exports = {
    createUser: async (email, password, username) => {
        let hashedPassword = hashPassword(password);
        try {
            await db.User.create({
                email,
                password: hashedPassword,
                username
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAllUsers: async () => {
        let user = [];
        try {
            return await db.User.findAll();
        } catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (id) => {
        try {
            await db.User.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
};