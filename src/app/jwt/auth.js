const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) => {
    const token = req.headers['token'];
    if(!token) {
        res.status(401).json('Bạn chưa đăng nhập,hãy thử lại');
    }
    else {
    try {
        jwt.verify(token,`${process.env.ACCESS_TOKEN_SECRET}`)
        next();
    } catch (error) {
        res.status(500).json('Không thể xác thực...');
    }
}
}

module.exports = verifyToken;