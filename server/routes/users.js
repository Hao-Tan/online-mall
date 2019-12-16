const express = require('express');
const router = express.Router();
const Users = require('../models/user');

/* GET users listing. */

// 用户登录
router.post("/login", (req, res) => {
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
                    status: "0",
                    msg: "",
                    result: {
                        userName: data.userName
                    }
                })
            } else {
                res.json({
                    status: "101",
                    msg: "账户密码错误",
                    result: ""
                });
            }
        }
    })
})

// 用户登出
router.post("/logout", (req, res) => {
    res.cookie("userId", "", {
        maxAge: -1
    });
    res.cookie("userName", "", {
        maxAge: -1
    });

    res.json({
        status: "0",
        msg: "",
        result: ""
    })
})


module.exports = router;