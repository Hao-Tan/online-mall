const express = require('express');
const router = express.Router();
const Users = require('../models/user');

/* GET users listing. */
router.post("/signIn", (req, res) => {
    let queryParam = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    Users.findOne(queryParam, (err, data) => {
        if (err) {
            res.send({
                status: "1",
                msg: err.msg,
                result: ""
            });
        } else {
            if (data) {
                res.cookie("userName", data.userName, {
                    maxAge: 1000 * 60 * 60
                });
                res.cookie("userId", data.userId, {
                    maxAge: 1000 * 60 * 60
                });

                res.send({
                    status: "10",
                    msg: "",
                    result: {
                        userName: data.userName
                    }
                })
            } else {
                res.json({
                    status: "1",
                    msg: "账户密码错误",
                    result: ""
                });
            }
        }
    })
})

module.exports = router;