//const Account = require('../models/Account.js');
//const jwt = require('jsonwebtoken');
//const authToken = require('../jwt/auth')
class AccountController {

    //[GET] account/show
    
    async show(req, res) {
    let page = req.query.page;
    const pageSize = 4;
    page = parseInt(page);
    if(page) {
        const numberOfPages = (page - 1) * pageSize;
        const data =  await Account.find({})
        .skip(numberOfPages)
        .limit(pageSize)
        res.json(data);
    }
    else {
        const data = await Account.find({})
        res.json({status: 'success' , data: data});
    }
}
    //[POST] account/register
    async register(req, res) {
            const username = req.body.username;
            //const phone = req.body.phone;
            //const email = req.body.email;
            const password = req.body.password;
            //var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
            //var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            //var regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
            //var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

            if(username  == null || username.trim() == '') {
                res.json('Mời nhập lại  username');
            }
            //if(!regexName.test(username)) {
            //    res.json('username khong hop le')
            //}
            if(password == null || password.trim() == '') {
                res.json('Mời nhập lại  password');
            }
            const data = await Account.findOne({username: username}).exec();
            if(data) {
                    res.json(`Tài khoản ${data.username} đã tồn tại`);   
            }
            else {
                const result = await Account.create({
                    username: username,
                    password: password
                })
            res.json(result);
            }
        }
    //[POST] account/login
    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        let data = await Account.findOne({username: username, password: password}).exec();
                if(data == null) {
                    res.json('Đăng nhập thất bại');
                }
                else {
                    const token  = jwt.sign({id: data._id},`${process.env.ACCESS_TOKEN_SECRET}`);
                    res.json({
                        message:'success',
                        token:token,
                   });
                }
    }
    //[PUT] account/:id
    async updateAccount(req, res) {
        const id = req.params.id;
        const newUsername = req.body.newUsername;
        const newPassword = req.body.newPassword;
        const newRole  = req.body.newRole;
        if(newUsername ==  null || newUsername.trim() == '') {
            res.json('Mời nhập lại  username');
        }
        if(newPassword == null || newPassword.trim() == '') {
            res.json('Mời nhập lại  password');
        }
        if(newRole == null || newRole.trim() == '') {
            res.json('Mời nhập lại  role');
        }
        const data = await Account.find({username: newUsername});
        if(data.length == 0 || (data.length >0 && data[0]._id == id)) {
            const result = await Account.findByIdAndUpdate(id,{username :newUsername,password:newPassword,role:newRole},{returnDocument :'after'});
            res.json(result);
        }
        else {
                res.json('Trùng username,hãy thử lại...');
        }
        }
        // if(data.length == 0 || (data.length > 0 && data[0]._id == id)) {
            // const result = await Account.findByIdAndUpdate(id,{username :newUsername,password:newPassword,role:newRole},{returnDocument :'after'});
            // res.json(result);
        // }
        // else {
        //     res.json('Trùng username,hãy thử lại');
        // }
    async destroyAccount(req, res) {
        const id = req.params.id;
        const data = await Account.findById({_id :id});
        console.log(data);
        if(data == null) {
            res.json('khong the xoa');
        }
        else {
            await Account.deleteOne({_id : id});
            res.json('xoa thanh cong');
        }
    }
}
module.exports = new AccountController;