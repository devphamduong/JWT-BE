import bcrypt from 'bcryptjs';
import db from '../models/index';
import { checkEmailExist, checkPhoneExist } from './accountService';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

module.exports = {
    createUser: async (data) => {
        try {
            let isExistEmail = await checkEmailExist(data.email);
            if (isExistEmail) {
                return {
                    EM: 'This email address is already in use on another account',
                    EC: 1,
                    DT: 'email'
                };
            }
            let isExistPhone = await checkPhoneExist(data.phone);
            if (isExistPhone) {
                return {
                    EM: 'This phone number is already in use on another account',
                    EC: 1,
                    DT: 'phone'
                };
            }
            let hashedPassword = hashPassword(data.password);
            data.password = hashedPassword;
            await db.User.create(data);
            return {
                EM: 'User is created successfully',
                EC: 0,
                DT: []
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
    getUserPaginate: async (page, limit) => {
        try {
            let offset = (page - 1) * limit;
            let { count, rows } = await db.User.findAndCountAll({
                offset, limit,
                attributes: ["id", "email", "username", "phone", "sex", "address"],
                include: { model: db.Group, attributes: ["name", "description", "id"] },
                order: [['id', 'DESC']]
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
            if (!data.groupId) {
                return {
                    EM: 'Group must be selected',
                    EC: 1,
                    DT: 'group'
                };
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id
                }
            });
            if (user) {
                await user.update(
                    {
                        username: data.username,
                        address: data.address,
                        sex: data.sex,
                        groupId: data.groupId
                    });
                return {
                    EM: 'User is updated successfully',
                    EC: 0,
                    DT: ''
                };
            } else {
                return {
                    EM: 'User not found',
                    EC: 2,
                    DT: ''
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
    }
};