var client = require("../library/database");

const getAllProduk = async function (req, res) {
  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  try {
    await client.connect();

    let collection = await client.db("ecommerce").collection("produk");
    let results = await collection
      .find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    // console.log(results);
    console.log(`Get all produk - Page: ${page}, PageSize: ${pageSize}`);
    await res.send(results);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const getProdukById = async function (req, res) {
  const produkId = parseInt(req.params.product_id);

  try {
    await client.connect();

    const collection = await client.db("ecommerce").collection("produk");
    const result = await collection.findOne({ product_id: produkId });

    if (!result) {
      return res.status(404).send("Product not found");
    }

    console.log(`Get product by ID - Product ID: ${produkId}`);
    res.send(result);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
};

const getAllKategori = async function (req, res) {
  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  try {
    await client.connect();

    let collection = await client.db("ecommerce").collection("kategori");
    let results = await collection
      .find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    // console.log(results);
    console.log(`Get all kategori - Page: ${page}, PageSize: ${pageSize}`);
    await res.send(results);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const getProdukByKategoriId = async function (req, res) {
  const kategoriId = parseInt(req.params.kategori_id);
  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  try {
    await client.connect();

    const produkCollection = await client.db("ecommerce").collection("produk");

    // Get produk berdasarkan kategoriId
    const products = await produkCollection
      .find({ kategori_id: kategoriId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (products.length === 0) {
      return res.status(404).send({
        message: "Wah  produk dengan kategori tersebut tidak ada nih !!!",
      });
    }

    console.log(`Get produk dengan kategori_id : ${kategoriId}`);
    res.send(products);
  } finally {
    await client.close();
  }
};

const getProdukByArea = async function (req, res) {
  const area = req.params.area;
  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  try {
    await client.connect();

    const produkCollection = await client.db("ecommerce").collection("produk");
    // Menggunakan ekspresi reguler untuk mencocokkan area tanpa memperhatikan huruf besar/kecil
    const areaRegex = new RegExp(area, "i");

    // Menambahkan pencarian berdasarkan area dengan like query
    const products = await produkCollection
      .find({ area: { $regex: areaRegex } })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (products.length === 0) {
      return res
        .status(404)
        .send({ message: `Produk di area ${area} tidak ditemukan.` });
    }

    console.log(`Get produk di area: ${area}`);
    res.send(products);
  } finally {
    await client.close();
  }
};

const getProdukByName = async function (req, res) {
  const name = req.query.name;
  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  try {
    await client.connect();

    const produkCollection = await client.db("ecommerce").collection("produk");
    // Menggunakan ekspresi reguler untuk mencocokkan name tanpa memperhatikan huruf besar/kecil
    const nameRegex = new RegExp(name, "i");

    // Menambahkan pencarian berdasarkan name dengan like query
    const products = await produkCollection
      .find({ name: { $regex: nameRegex } })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (products.length === 0) {
      return res
        .status(404)
        .send({ message: `Produk dengan nama ${name} tidak ditemukan.` });
    }

    console.log(`Get produk dengan nama: ${name}`);
    res.send(products);
  } finally {
    await client.close();
  }
};

const getProdukByFiltering = async function (req, res) {
  const max_price = parseInt(req.query.max_price) || 999999999999999;
  const discount = parseFloat(req.query.discount) || 0;
  const rating = parseFloat(req.query.rating) || 0;

  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  try {
    await client.connect();

    const produkCollection = await client.db("ecommerce").collection("produk");
    console.log(max_price, discount, rating);
    const products = await produkCollection
      .find({
        price: { $lt: max_price },
        discount: { $gt: discount },
        ratings: { $gt: rating },
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (products.length === 0) {
      return res.status(404).send({ message: `Produk tidak ditemukan.` });
    }

    console.log(`Get produk by filter`);
    res.send(products);
  } finally {
    await client.close();
  }
};
module.exports = {
  getAllProduk,
  //search
  getProdukByFiltering,
  getAllKategori,
  getProdukByKategoriId,
  getProdukByArea,
  getProdukByName,
  getProdukById,
};
