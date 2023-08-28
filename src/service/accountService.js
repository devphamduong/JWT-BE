import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: { email }
    });
    if (user) {
        return true;
    }
    return false;
};

const checkPhoneExist = async (phone) => {
    let user = await db.User.findOne({
        where: { phone }
    });
    if (user) {
        return true;
    }
    return false;
};

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
    createUser: async (data) => {
        try {
            let isExistEmail = await checkEmailExist(data.email);
            if (isExistEmail) {
                return {
                    EM: 'This email address is already in use on another account',
                    EC: 1
                };
            }
            let isExistPhone = await checkPhoneExist(data.phone);
            if (isExistPhone) {
                return {
                    EM: 'This phone number is already in use on another account',
                    EC: 1
                };
            }
            let hashedPassword = hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                username: data.username,
                phone: data.phone
            });
            return {
                EM: 'User is created successfully',
                EC: 0
            };
        } catch (error) {
            console.log(error);
            return {
                EM: 'Something went wrong',
                EC: -2
            };
        }
    },
    loginUser: async (data) => {
        try {
            let user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: data.emailOrPhone },
                        { phone: data.emailOrPhone }
                    ]
                }
            });
            if (user) {
                let isCorrectPassword = checkPassword(data.password, user.password);
                if (isCorrectPassword) {
                    return {
                        EM: 'OK',
                        EC: 0,
                        DT: ''
                    };
                }
            }
            return {
                EM: 'Your email/phone or password is incorrect',
                EC: 1,
                DT: ''
            };
        } catch (error) {
            console.log(error);
            return {
                EM: 'Something went wrong',
                EC: -2,
                DT: ''
            };
        }
    },
};