const conn = require('./conn');
const Products = require('./product');
const Orders = require('./order');
const LineItems = require('./lineItem');

Orders.hasMany(LineItems);
LineItems.belongsTo(Products);

const sync = () => {
    return conn.sync({ force: true });
}

const seed = () => {
    return Promise.all([
        Products.create({ name: "Foo" }),
        Products.create({ name: "Bar" }),
        Products.create({ name: "Bazz" }),
        Products.create({ name: "Quq" }),
    ]);
}

module.exports = {
    sync,
    seed,
    models: {
        Products, 
        Orders,
        LineItems
    }
}