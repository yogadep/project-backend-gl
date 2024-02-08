var client = require("../library/database");

const cekAPI = async function (req, res, next) {
  // Check if an API key exists in the query parameters
  const search_api_key = req.query.api_key;

  if (search_api_key) {
    await client.connect();
    const usersCollection = client.db("ecommerce").collection("users");

    try {
      const users = await usersCollection
        .find({
          api_key: search_api_key,
        })
        .toArray();

      if (users.length === 0) {
        return res.status(404).send({
          message: "API KEY TIDAK DITEMUKAN",
        });
      } else {
        next();
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  } else {
    return res.status(400).send({
      message: "MASUKAN API KEY",
    });
  }
};

module.exports = {
  cekAPI,
};
