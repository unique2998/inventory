const express = require('express');
const router = express.Router();
const db = require('./database');


router.post('/', express.json(), async(req, res) => {
    const { supplier, address } = req.body;
    const [results] = await db.promise().execute('insert into suppliers (supplier, address) values (?,?)', [supplier, address]);
    res.send(results);
});

router.get('/', async (req, res) => {

    const [results] = await db.promise().query('SELECT * FROM suppliers');
    
    res.send(results);
});


router.put('/', express.json(), async(req, res) => {
    const { id, supplier,  address} = req.body;
    const results = await db.promise().execute('update suppliers set supplier=?, address=? where id = ?',[supplier, address, id]);
    res.send(results);
});


router.delete('/', express.json(), async(req, res) => {
    const { id } = req.body;
    const results = await db.promise().execute('DELETE FROM suppliers WHERE id=?',[id]);
    res.send(results);
});

module.exports = router;