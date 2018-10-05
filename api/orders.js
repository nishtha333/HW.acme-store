const db = require('../db');
const { Orders, LineItems } = db.models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/reset', (req, res, next) => {
    db.sync()
      .then(() => { return db.seed() })
      .then(() => res.sendStatus(204))
      .catch(next);
});

router.get('/', (req, res, next) => {
    Orders.findAll({
        include: [ LineItems ],
        order: [ ['createdAt', 'DESC'] ]
    }).then(orders => res.send(orders))
    .catch(next);
});

// Creates the Cart. User checks to see if any "CART" on it's store. If not, then calls post to create one
router.post('/', (req, res, next) => {
    Orders.create({ status: 'CART'})
        .then(order => res.status(201).send(order))
        .catch(next);
});

//Updates order: status (CART -> ORDER)
router.put('/:id', (req, res, next) => {
    Orders.findById(req.params.id)
        .then(order => order.update(req.body))
        .then(order => res.send(order))
        .catch(next);
});

//Create line-item in order
router.post('/:orderId/lineItems', (req, res, next) => {
    LineItems.create({ orderId: req.params.orderId, productId: req.body.productId, quantity: req.body.quantity })
        .then(lineItem => res.status(201).send(lineItem))
        .catch(next);
});

//Update line-item in order
router.put('/:orderId/lineItems/:id', (req, res, next) => {
    LineItems.findById(req.params.id)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem => res.send(lineItem))
        .catch(next);
});

//Delete the line-item in order
router.delete('/:orderId/lineItems/:id', (req, res, next) => {
    LineItems.destroy({
        where: {
            orderId: req.params.orderId,
            id: req.params.id
        }
    }).then(() => res.sendStatus(204))
    .catch(next);
});