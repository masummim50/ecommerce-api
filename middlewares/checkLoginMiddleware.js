const jwt = require("jsonwebtoken")
const {promisify} = require('util')
module.exports.checkLoginMiddleware = async(req, res, next)=> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(404).json({
            status:'fail',
            message:error?.message
        })
    }
}