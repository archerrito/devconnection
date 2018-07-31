const express = require('express');
const router = express.Router();

//Serve JSON
// @ route GET api/users/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

//export for server to pick up
module.exports = router;