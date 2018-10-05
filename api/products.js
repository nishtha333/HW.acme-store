const { Products } = require('../db').models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    Products.findAll()
        .then(products => res.send(products))
        .catch(next);
});