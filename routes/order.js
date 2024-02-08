var express = require("express");
var router = express.Router();
const orderController = require("../controller/orderController");
var verif = require("../library/verif");

router.get("/getAllOrder", orderController.getAllOrder);
router.post("/createOrder/:user_id", orderController.createOrder);
router.get("/getOrderById/:order_id", orderController.getOrderById);
router.put("/editOrder/:order_id", orderController.editOrder);
router.delete("/deleteOrder/:order_id", orderController.deleteOrder);

//DELETE deleteOrder(order_id)
module.exports = router;