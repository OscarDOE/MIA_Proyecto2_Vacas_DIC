const { Router } = require('express')
const router = Router(); 
// const { router } = require('../app')


router.get('/', (req, res) => {
    res.json({tittle:"PROBANDO NUEOVOS COSOS"})
})

module.exports = router;