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
            let data = await accountService.createUser(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
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
    handleLogin: async (req, res) => {
        const { emailOrPhone, password } = req.body;
        try {
            if (!emailOrPhone || !password) {
                return res.status(200).json({
                    EM: 'Missing required parameters',
                    EC: '1',
                    DT: ''
                });
            }
            let data = await accountService.loginUser(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
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