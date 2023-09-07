import groupService from '../service/groupService';

module.exports = {
    readFunc: async (req, res) => {
        try {
            let data = await groupService.getAllGroups();
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
    }
};