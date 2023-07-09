
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const products = require('./products');
const ptypes = require('./product-types');
const suppliers = require('./suppliers');
const customers = require('./customers');
const stocks = require('./stocks');
const sales = require('./sales');

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/products', products);
app.use('/product-types', ptypes);
app.use('/suppliers', suppliers);
app.use('/customers', customers);
app.use('/stocks', stocks);
app.use('/sales', sales);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

