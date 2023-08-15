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
        let users = [];
        try {
            users = await db.User.findAll();
            return users;
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
    },
    getUserById: async (id) => {
        let user = {};
        try {
            user = await db.User.findOne({
                where: {
                    id
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async (id, email, username) => {
        try {
            await db.User.update(
                { email, username },
                {
                    where: {
                        id
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
};