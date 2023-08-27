import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index';

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
                EC: 1
            };
        } catch (error) {
            console.log(error);
            return {
                EM: 'Something went wrong',
                EC: -2
            };
        }
    },
};