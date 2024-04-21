const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('list de messages')
})

router.get('/:id', (req, res)=>{
    res.send('parametre'+ req.params.id)
})
module.exports = router;