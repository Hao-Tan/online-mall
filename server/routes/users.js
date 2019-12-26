/* eslint-disable no-unused-vars */
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
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.cookie("userId", data.userId, {
                    maxAge: 1000 * 60 * 60 * 24
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
        Users.findOne({
            userId: userId
        }, (err, data) => {
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
    Users.findOne({
        userId: userId
    }, (err, data) => {
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
                Goods.findOne({
                    productId: productId
                }, (err, goodsData) => {
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
                            "checked": 0
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


// 获取购物车数据
router.get("/cartlist", (req, res) => {
    let userId = req.cookies.userId;
    Users.findOne({
        userId: userId
    }, (err, data) => {
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
                result: data.cartList
            })
        }
    })
})

// 删除购物车商品
router.post("/cartDel", (req, res) => {
    let productId = req.body.productId,
        userId = req.cookies.userId;

    Users.updateOne({
        userId: userId
    }, {
        $pull: {
            cartList: {
                productId: productId
            }
        }
    }, (err, data) => {
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
})

// 改变单个商品状态
router.post("/cartEdit", (req, res) => {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.checked,
        productNum = req.body.productNum;

    Users.updateOne({
        userId: userId,
        "cartList.productId": productId
    }, {
        $set: {
            "cartList.$.checked": checked,
            "cartList.$.productNum": productNum
        }
    }, (err, data) => {
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
})

// 全选
router.post("/checkedAll", (req, res) => {
    let userId = req.cookies.userId,
        checked = req.body.checked;
    Users.updateOne({
        userId
    }, {
        $set: {
            "cartList.$[].checked": checked
        }
    }, (err, data) => {
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
})

// 获取地址列表
router.get("/addressList", (req, res) => {
    let userId = req.cookies.userId;
    Users.findOne({
        userId
    }, (err, user) => {
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
                result: user.addressList
            })
        }
    })
})

// 设置默认地址
router.post("/setDefault", (req, res) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId;
    Users.findOne({
        userId,
    },(err, user) =>{
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            }) 
        } else {
            user.addressList.forEach(address => {
                if (address.addressId === addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            })
            user.save((err, data) => {
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
})

// 删除地址
router.post("/delAddress", (req, res) => {
    let addressId = req.body.addressId;
    Users.updateOne({
        "addressList.addressId": addressId
    }, {
        $pull: {
            addressList: {
                addressId
            }
        }
    }, (err, data) => {
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
})

module.exports = router;