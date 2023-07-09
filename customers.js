const express = require('express');
const router = express.Router();
const db = require('./database');


router.post('/', express.json(), async(req, res) => {
    const { lastname, firstname, address, loyalty_card_number } = req.body;
    const [results] = await db.promise().execute('insert into customers (lastname, firstname, address, loyalty_card_number) values (?,?,?,?)', [lastname, firstname, address, loyalty_card_number]);
    res.send(results);
});

router.get('/', async (req, res) => {

    const [results] = await db.promise().query('SELECT * FROM customers');
    
    res.send(results);
});


router.put('/', express.json(), async(req, res) => {
    const { id, lastname, firstname, address, loyalty_card_number} = req.body;
    const results = await db.promise().execute('update customers set lastname = ?, firstname = ?, address = ?, loyalty_card_number = ? where id = ?',[lastname, firstname, address, loyalty_card_number, id]);
    res.send(results);
});


router.delete('/', express.json(), async(req, res) => {
    const { id } = req.body;
    const results = await db.promise().execute('DELETE FROM customers WHERE id=?',[id]);
    res.send(results);
});

module.exports = router;