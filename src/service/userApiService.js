import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const getUserById = async (id) => {
    let user = {};
    try {
        user = await db.User.findOne({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser: async (data) => {
        let hashedPassword = hashPassword(data.password);
        try {
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                username: data.username
            });
        } catch (error) {
            console.log(error);
            return {
                EM: 'Error from service',
                EC: -1,
                DT: []
            };
        }
    },
    getAllUsers: async () => {
        try {
            let users = await db.User.findAll({
                attributes: ["id", "email", "username", "phone", "sex"],
                include: { model: db.Group, attributes: ["name", "description"] }
            });
            if (users) {
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: users
                };
            } else {
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: []
                };
            }
        } catch (error) {
            console.log(error);
            return {
                EM: 'Error from service',
                EC: -1,
                DT: []
            };
        }
    },
    getUserPaginate: async (page, limit) => {
        try {
            let offset = (page - 1) * limit;
            let { count, rows } = await db.User.findAndCountAll({
                offset, limit,
                attributes: ["id", "email", "username", "phone", "sex"],
                include: { model: db.Group, attributes: ["name", "description"] }
            });
            let totalPage = Math.ceil(count / limit);
            let data = {
                totalPage,
                totalRow: count,
                users: rows
            };
            return {
                EM: 'OK',
                EC: 0,
                DT: data
            };
        } catch (error) {
            console.log(error);
            return {
                EM: 'Error from service',
                EC: -1,
                DT: []
            };
        }
    },
    deleteUser: async (id) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id
                }
            });
            if (user) {
                await user.destroy();
                return {
                    EM: 'Delete successfully',
                    EC: 0,
                    DT: []
                };
            } else {
                return {
                    EM: 'Delete failed or user not found',
                    EC: 1,
                    DT: []
                };
            }
        } catch (error) {
            console.log(error);
            return {
                EM: 'Error from service',
                EC: -1,
                DT: []
            };
        }
    },
    updateUser: async (data) => {
        try {
            let user = getUserById(data.id);
            if (user) {
                await db.User.update(
                    { email: data.email, username: data.username },
                    {
                        where: {
                            id: user.id
                        }
                    });
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }
};