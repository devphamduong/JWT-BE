module.exports = {
    handleRegister: (req, res) => {
        return res.status(200).json({
            message: req.body
        });
    },
};