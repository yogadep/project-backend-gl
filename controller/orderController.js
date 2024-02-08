var client = require("../library/database");

const getAllOrder = async function (req, res) {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;

    try {
        await client.connect();

        let collection = await client.db("ecommerce").collection("orders");
        let results = await collection
        .aggregate([
            {
                $lookup: {
                    from: 'order_product',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'orderdetails'
                }
            },
            {
                $unwind: '$orderdetails'
            },
            {
                $lookup: {
                    from: 'produk',
                    localField: 'orderdetails.product_id',
                    foreignField: 'product_id',
                    as: 'orderdetails.produkdetails'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    order_id: { $first: '$order_id' },
                    orderdetails: { $push: '$orderdetails' }
                }
            }
        ])
            .toArray();
        // console.log(results);
        console.log(`Get all produk - Page: ${page}, PageSize: ${pageSize}`);
        await res.send(results);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

const getOrderById = async function (req, res) {
   const search_order_id = parseInt(req.params.order_id);

    try {
        await client.connect();

        let collection = await client.db("ecommerce").collection("orders");
        let results = await collection
        .aggregate([
            {
              $match: { order_id: search_order_id }
            },
            {
              $lookup: {
                from: 'order_product',
                localField: 'order_id',
                foreignField: 'order_id',
                as: 'orderdetails'
              }
            },
            {
              $unwind: '$orderdetails'
            },
            {
              $lookup: {
                from: 'produk',
                localField: 'orderdetails.product_id',
                foreignField: 'product_id',
                as: 'orderdetails.produkdetails'
              }
            },
            {
              $group: {
                _id: '$_id',
                user_id: { $first: '$user_id' },
                order_id: { $first: '$order_id' },
                orderdetails: { $push: '$orderdetails' }
              }
            }
          ])
        .toArray();
        // console.log(results);
        await res.send(results);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

const createOrder = async function (req, res) {
    const user_id = parseInt(req.params.user_id);
    const { order_produk } = req.body;
    const order_id = Math.floor(Math.random() * 900000) + 100000;
  
    try {
      await client.connect();
  
      const ordersCollection = await client.db("ecommerce").collection("orders");
      const order_productCollection = await client.db("ecommerce").collection("order_product");
  
      // Check if an order with the same order_id already exists
      const existingOrder = await ordersCollection.findOne({ order_id });
  
      // If order with the same order_id already exists, return an error
      if (existingOrder) {
        return res.status(400).send({
          message: "Order with the same order_id already exists!",
        });
      }
  
      // Create a new order
      const newOrder = {
        user_id,
        order_id,
      };
  
      // Insert the new order into the ordersCollection
      await ordersCollection.insertOne(newOrder);
  
      // Insert each product in order_produk array into order_productCollection
      for (const product of order_produk) {
        const { product_id, qty } = product;
  
        const orderProduct = {
          order_id,
          product_id: product_id,
          qty,
        };
  
        await order_productCollection.insertOne(orderProduct);
      }
  
      console.log('Order berhasil dibuat');
      res.status(201).send({
        message: `Order berhasil dibuat dengan user_id: ${user_id}`,
      });
    } finally {
      await client.close();
    }
  };

  const editOrder = async function (req, res) {
    const order_id = parseInt(req.params.order_id);
    const { order_produk } = req.body;
    try {
      await client.connect();
  
      const ordersCollection = await client.db("ecommerce").collection("orders");
      const order_productCollection = await client.db("ecommerce").collection("order_product");
  
      // Check if the order with the specified order_id exists
      const existingOrder = await ordersCollection.findOne({ order_id });
  
      // If the order doesn't exist, return an error
      if (!existingOrder) {
        return res.status(404).send({
          message: "Order not found!",
        });
      }
    
      // Update the order products in order_productCollection
      await order_productCollection.deleteMany({ order_id });
      for (const product of order_produk) {
        const { product_id, qty } = product;
  
        const orderProduct = {
          order_id,
          product_id: product_id,
          qty,
        };
  
        await order_productCollection.insertOne(orderProduct);
      }
  
      console.log('Order berhasil diupdate');
      res.status(200).send({
        message: `Order berhasil diupdate dengan order_id: ${order_id}`,
      });
    } finally {
      await client.close();
    }
  };


  const deleteOrder = async function (req, res) {
    try {
      await client.connect();
  
      const order_id = parseInt(req.params.order_id);
  
      const ordersCollection = await client.db("ecommerce").collection("orders");
      const order_productCollection = await client.db("ecommerce").collection("order_product");
      const orderResult = await ordersCollection.deleteOne({ order_id: order_id });
      const order_productResult = await order_productCollection.deleteMany({ order_id: order_id });
      
  
      if (orderResult.deletedCount === 1) {
        console.log(`Order dengan id ${order_id} berhasil didelete`);
        res.send(`Order dengan id ${order_id} berhasil didelete`);
      } else {
        console.log(`Order dengan id ${order_id} tidak ada`);
        res.status(404).send(`Order dengan id ${order_id} tidak ada`);
      }
    } finally {
      await client.close();
    }
  };
module.exports = {
    //GET getAllOrder()
    getAllOrder,
    //GET getOrderById(order_id)
    getOrderById,
    //POST createOrder(object produk)
    createOrder,
    //PUT editOrder(order_id, object produk)
    editOrder,
    //DELETE deleteOrder(order_id)
    deleteOrder
};