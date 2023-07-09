const express = require('express');
const router = express.Router();
const db = require('./database');


router.post('/', express.json(), async(req, res) => {
    const { prod_desc, retail_price, wsale_price, prod_cat } = req.body;
    const [results] = await db.promise().execute('insert into products (prod_desc, retail_price, wsale_price, prod_cat) values (?,?,?,?)', [prod_desc, retail_price, wsale_price, prod_cat]);
    res.send(results);
});

router.get('/', async (req, res) => {

    const [results] = await db.promise().query('select products.id, products.prod_desc, products.retail_price, products.wsale_price, product_types.type_desc, products.prod_cat from products join product_types on products.prod_cat = product_types.id');
    
    res.send(results);
});


router.put('/', express.json(), async(req, res) => {
    const { id, prod_desc, retail_price, wsale_price, prod_cat } = req.body;
    const results = await db.promise().execute('update products set prod_desc=?, retail_price=?, wsale_price=?, prod_cat=? where id = ?',[prod_desc, retail_price, wsale_price, prod_cat, id]);
    res.send(results);
});


router.delete('/', express.json(), async(req, res) => {
    const { id } = req.body;
    const results = await db.promise().execute('DELETE FROM products WHERE id=?',[id]);
    res.send(results);
});

module.exports = router;