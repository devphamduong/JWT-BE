import accountService from '../service/accountService';

module.exports = {
    handleRegister: async (req, res) => {
        const { email, phone, password } = req.body;
        try {
            if (!email || !phone || !password) {
                return res.status(200).json({
                    EM: 'Missing required parameters',
                    EC: '1',
                    DT: ''
                });
            }
            let result = await accountService.createUser(req.body);
            return res.status(200).json({
                EM: result.EM,
                EC: result.EC,
                DT: ''
            });
        } catch (error) {
            return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
            });
        }
    },
};