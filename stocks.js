const express = require('express');
const router = express.Router();
const db = require('./database');


router.post('/', express.json(), async(req, res) => {
    const { product_id, remarks, qty, supplier_id } = req.body;
    const [results] = await db.promise().execute('insert into stocks (date_imported, product_id, remarks, qty, supplier_id) values (CURDATE(),?,?,?,?)', [product_id, remarks, qty, supplier_id]);
    res.send(results);
});

router.get('/', async (req, res) => {

    const [results] = await db.promise().query('SELECT stocks.id, stocks.date_imported, products.prod_desc, stocks.remarks, stocks.qty,suppliers.supplier, stocks.product_id, stocks.supplier_id  FROM stocks join products on products.id = stocks.product_id join suppliers on suppliers.id = stocks.supplier_id');
    
    res.send(results);
});


router.put('/', express.json(), async(req, res) => {
    const { id, product_id, remarks, qty, supplier_id} = req.body;
    const results = await db.promise().execute('update stocks set product_id = ?, remarks = ?, qty = ?, supplier_id= ? where id = ?',[product_id, remarks, qty, supplier_id, id]);
    res.send(results);
});


router.delete('/', express.json(), async(req, res) => {
    const { id } = req.body;
    const results = await db.promise().execute('DELETE FROM stockss WHERE id=?',[id]);
    res.send(results);
});

module.exports = router;