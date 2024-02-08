var client = require("../library/database");

const getAllUser = async function (req, res) {
  try {
    await client.connect();

    let collection = await client.db("ecommerce").collection("users");
    let results = await collection.find({}).toArray();
    // console.log(results);
    console.log("get all users");
    await res.send(results);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
const getApiKey = async function (req, res) {
  const search_no_hp = req.params.no_hp;
  try {
    await client.connect();

    const usersCollection = await client.db("ecommerce").collection("users");

    // Get produk berdasarkan kategoriId
    const users = await usersCollection
      .find({
        no_hp: search_no_hp,
      })
      .toArray();

    if (users.length === 0) {
      return res.status(404).send({
        message: "User Tidak ditemukan!",
      });
    }

    const apiKey = users[0].api_key;

    console.log(`Api Key : ${apiKey}`);
    res.send({
      api_key: apiKey,
    });
  } finally {
    await client.close();
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const database = client.db("ecommerce");
  const userCollection = database.collection("users");

  try {
    await client.connect();

    const user = await userCollection.findOne({ user_id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Get user dengan user_id : ${userId}`);
    res.send(user);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

const updateUser = async function (req, res) {
  try {
    await client.connect();

    const userId = parseInt(req.params.user_id);

    const collection = await client.db("ecommerce").collection("users");

    const updateOperation = {
      $set: {
        no_hp: req.body.no_hp,
        name: req.body.name,
      },
    };

    const result = await collection.updateOne(
      { user_id: userId },
      updateOperation
    );

    console.log("User sudah berhasil diupdate nih ye!!!");

    res.send("User sudah berhasil diupdate nih ye!!!");
  } finally {
    await client.close();
  }
};

const registerUser = async function (req, res) {
  const crypto = require("crypto");
  const { no_hp, name } = req.body; // Ambil no_hp dan name dari body request
  const user_id = Math.floor(Math.random() * 900000) + 100000;
  const apiKey = crypto.randomBytes(16).toString("hex"); // Menghasilkan API key baru

  try {
    await client.connect();

    const usersCollection = await client.db("ecommerce").collection("users");

    // Cek apakah user dengan no_hp tersebut sudah terdaftar
    const existingUser = await usersCollection.findOne({ no_hp });

    // Jika user sudah terdaftar, kirim pesan kesalahan
    if (existingUser) {
      return res.status(400).send({
        message: "User dengan nomor HP tersebut sudah terdaftar!",
      });
    }

    // Jika user belum terdaftar, tambahkan user baru
    const newUser = {
      user_id,
      no_hp,
      name,
      api_key: apiKey, // Tambahkan API key ke data user baru
      // Anda dapat menambahkan properti lain jika diperlukan
    };

    await usersCollection.insertOne(newUser);

    console.log("User berhasil terdaftar");
    res.status(201).send({
      message: `User berhasil terdaftar dengan api_key: ${apiKey}`,
    });
  } finally {
    await client.close();
  }
};

const deleteUser = async function (req, res) {
  try {
    await client.connect();

    const userId = parseInt(req.params.user_id);

    const collection = await client.db("ecommerce").collection("users");

    const result = await collection.deleteOne({ user_id: userId });

    if (result.deletedCount === 1) {
      console.log(`User dengan id ${userId} berhasil didelete`);
      res.send(`User dengan id ${userId} berhasil didelete`);
    } else {
      console.log(`User dengan id ${userId} tidak ada`);
      res.status(404).send(`User dengan id ${userId} tidak ada`);
    }
  } finally {
    await client.close();
  }
};

module.exports = {
  //POST registerUser(no_hp, name)
  registerUser,
  //GET getApiKey(no_hp)
  getApiKey,
  //GET getAllUser()
  getAllUser,
  getUserById,
  //GET getUserById(user_id)
  //PUT editUser(user_id)
  updateUser,
  deleteUser,
  //DELETE deleteUser(user_id)
};
