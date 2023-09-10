import userApiService from '../service/userApiService';

module.exports = {
    readFunc: async (req, res) => {
        try {
            if (req.query.page && req.query.limit) {
                const { page, limit } = req.query;
                let data = await userApiService.getUserPaginate(+page, +limit);
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                });
            } else {
                let data = await userApiService.getAllUsers();
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
            });
        }
    },
    createFunc: async (req, res) => {
        try {
            let data = await userApiService.createUser(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
            });
        }
    },
    updateFunc: async (req, res) => {
        try {
            let data = await userApiService.updateUser(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
            });
        }
    },
    deleteFunc: async (req, res) => {
        try {
            let data = await userApiService.deleteUser(req.body.id);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
            });
        }
    },
};