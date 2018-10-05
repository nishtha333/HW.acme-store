const path = require('path');
const express = require('express');
const app = express();

module.exports = app;

app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use('/api/products', require('./api/products'));
app.use('/api/orders', require('./api/orders'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.use((req, res, next) => {
    let error = new Error("Resource could not be found");
    error.status = 400;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Error occurred while processing the request");
});