const express = require('express');
const router = express.Router();
const db = require('./database');


router.post('/', express.json(), async(req, res) => {
    const { product_id, qty, customer_id } = req.body;
    let timestamp = new Date().getTime();

    const [results] = await db.promise().execute('insert into sales (product_id, qty, customer_id, timestamp) values (?,?,?,?)', [product_id, qty, customer_id, timestamp]);
    res.send(results);
});

router.get('/', async (req, res) => {

    const [results] = await db.promise().query('SELECT sales.id, sales.product_id, sales.qty, sales.customer_id, sales.timestamp, products.prod_desc, CONCAT(customers.firstname,\' \',customers.lastname) as customer, products.retail_price, (products.retail_price * sales.qty) as total_amount FROM sales join products ON products.id = sales.product_id JOIN customers on customers.id = sales.customer_id ');
    
    for(let i = 0; i < results.length; i++){
        let date = new Date(parseInt(results[i].timestamp));
        results[i].timestamp = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
    

    res.send(results);
});


router.put('/', express.json(), async(req, res) => {
    const { id, product_id, qty, customer_id} = req.body;
    const results = await db.promise().execute('update sales set product_id = ?, qty = ?, customer_id = ? where id = ?',[product_id, qty, customer_id, id]);
    res.send(results);
});


router.delete('/', express.json(), async(req, res) => {
    const { id } = req.body;
    const results = await db.promise().execute('DELETE FROM sales WHERE id=?',[id]);
    res.send(results);
});

module.exports = router;