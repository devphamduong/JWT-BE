module.exports = {
    testApi: (req, res) => {
        return res.status(200).json({
            message: 'ok'
        });
    }
};