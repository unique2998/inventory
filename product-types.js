const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/', async (req, res) => {
    const [results] = await db.promise().query('select * from product_types;');

    
    res.send(results);
});

router.post('/', express.json() , async (req, res) => {
    const { type_desc } = req.body;
    const [results] = await db.promise().query(`insert into product_types(type_desc) values ('${type_desc}')`);
    res.send(results);
});

router.put('/', express.json() , async (req, res) => {
    const { id, type_desc } = req.body;
    const [results] = await db.promise().query(`update product_types set type_desc='${type_desc}' where id = ${id}`);
    res.send(results);
});

router.delete('/', express.json() , async (req, res) => {
    const { id } = req.body;
    const [results] = await db.promise().query(`DELETE FROM product_types WHERE id = ${id}`);
    res.send(results);
    
});

module.exports = router;