const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');

// GET req for goodslist
router.get("/list", (req, res) => {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let priceLevel = req.query.priceLevel;
    let sort = req.query.sort;
    let skip = (page - 1) * pageSize;
    let priceGt = '',
        priceLte = '';
    let queryParams = {};
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 5000;
                break;
        }

        queryParams = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        };
    }

    let goodsModel = Goods.find(queryParams).skip(skip).limit(pageSize).sort({'salePrice': sort});

    goodsModel.exec(function (err, data) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: data.length,
                    list: data
                }
            });
        }
    })
})


module.exports = router;