import db from '../models/index';

module.exports = {
    getAllGroups: async () => {
        try {
            let groups = await db.Group.findAll({
                order: [['name', 'ASC']]
            });
            if (groups) {
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: groups
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
    }
};