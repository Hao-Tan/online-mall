const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Goods = require('../models/goods')

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
                msg: err.message,
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

// 用户cookie登录
router.get("/cookiesCheck", (req, res) => {
    if (req.cookies.userId) {
        res.json({
            status: "0",
            msg: "",
            result: {
                userName: req.cookies.userName
            }
        })
    } else {
        res.json({
            status: "102",
            msg: "未登录",
            result: ""
        })
    }
})

// 获取购物车商品总数
router.get("/getCartCount", (req, res) => {
    if (req.cookies && req.cookies.userId) {
        let userId = req.cookies.userId;
        Users.findOne({userId: userId}, (err, data) => {
            if (err) {
                res.json({
                    status: 1,
                    msg: err.message,
                    result: ""
                })
            } else {
                let total = 0;
                data.cartList.forEach(cartGood => {
                    total += parseInt(cartGood.productNum);
                })
                res.json({
                    status: "0",
                    msg: "",
                    result: {
                        cartCount: total
                    }
                })
            }
        })
    }
})

// 添加商品至购物车
router.post("/addCart", (req, res) => {
    let productId = req.body.productId,
        userId = req.cookies.userId;
    Users.findOne({userId: userId}, (err, data) => {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        } else if (data) {
            let index;
            data.cartList.forEach(element => {
                if (element.productId === productId) {
                    element.productNum++;
                    index = productId; // index用于标记是否找到历史记录
                }
            });

            if (index) {
                data.save((saveErr, data) => {
                    if (saveErr) {
                        res.json({
                            status: 1,
                            msg: saveErr.message,
                            result: ""
                        })
                    } else {
                        res.json({
                            status: "0",
                            msg: "",
                            result: "success"
                        })
                    }
                })
            } else {
                Goods.findOne({productId: productId}, (err, goodsData) => {
                    if (err) {
                        res.json({
                            status: "1",
                            msg: err.message,
                            result: ""
                        })
                    } else {
                        data.cartList.push({
                            "productId": goodsData.productId,
                            "productName": goodsData.productName,
                            "salePrice": goodsData.salePrice,
                            "productImage": goodsData.productImage,
                            "productNum": 1,
                            "checked": 1
                        })
                        data.save((err, data) => {
                            if (err) {
                                res.json({
                                    status: "1",
                                    msg: err.message,
                                    result: ""
                                })
                            } else {
                                res.json({
                                    status: "0",
                                    msg: "",
                                    result: "success"
                                })
                            }
                        })
                    }
                })
            }
        }
    })
})


module.exports = router;