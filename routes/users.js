var express = require('express');
var router = express.Router();
var verif = require("../library/verif");
const usersController = require('../controller/usersController');



router.post('/registerUser', usersController.registerUser);
router.get('/getApiKey/:no_hp', usersController.getApiKey);
router.get('/getAllUser', verif.cekAPI, usersController.getAllUser);
router.get('/getUserById/:userId',verif.cekAPI, usersController.getUserById);
router.put('/updateUser/:user_id', verif.cekAPI,usersController.updateUser);
router.delete('/delete/:user_id', verif.cekAPI,usersController.deleteUser);
  
module.exports = router;