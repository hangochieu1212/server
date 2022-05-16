 const Account  = require('../models/Account');
 const Course = require('../models/Course');
 const checkAdmin = async (req, res ,next) => {
    const role = req.body.role;
    console.log();
    
    const data = await Account.find({role : role})
    //console.log(data);
    if(role === 'admin') {
        next();
    }
    else {
        res.json('Bạn không có quyền truy cập')
    }
 }

 module.exports = checkAdmin;