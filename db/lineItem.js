const conn = require('./conn');

const LineItems = conn.define('line_item', {
    quantity: {
        type: conn.Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = LineItems;