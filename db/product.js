const conn = require('./conn');


const Products = conn.define('product', {
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = Products;