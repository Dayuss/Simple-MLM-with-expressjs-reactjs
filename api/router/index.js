const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/api/member', require("../controller/memberController"))
module.exports = router;