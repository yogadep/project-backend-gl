const swaggerJsDoc = require("swagger-jsdoc");

const paramsApiKey = {
  name: "api_key",
  in: "query",
  required: true,
  description: "API Key dari user",
  schema: {
    type: "string",
  },
};

const paramsPage = {
  name: "page",
  in: "query",
  required: false,
  description: "Query page untuk paginasi",
  schema: {
    type: "integer",
  },
};

const paramsPageSize = {
  name: "pageSize",
  in: "query",
  required: false,
  description: "Query page size untuk paginasi",
  schema: {
    type: "integer",
  },
};

const propertiOrder = [
  {
    _id: {
      type: "string",
    },
    user_id: {
      type: "integer",
    },
    order_id: {
      type: "integer",
    },
    orderdetails: [
      {
        _id: {
          type: "string",
        },
        order_id: {
          type: "integer",
        },
        product_id: {
          type: "integer",
        },
        qty: {
          type: "integer",
        },
        productdetails: [
          {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            url: {
              type: "string",
            },
            kategori_id: {
              type: "integer",
            },
            shop_id: {
              type: "integer",
            },
            item_id: {
              type: "integer",
            },
            product_id: {
              type: "integer",
            },
            price: {
              type: "integer",
            },
            min_price: {
              type: "integer",
            },
            max_price: {
              type: "integer",
            },
            area: {
              type: "string",
            },
            stock: {
              type: "integer",
            },
            discount: {
              type: "integer",
            },
            rating: {
              type: "float",
            },
            sold: {
              type: "integer",
            },
          },
        ],
      },
    ],
  },
];

const propertiProduk = {
  _id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  url: {
    type: "string",
  },
  kategori_id: {
    type: "integer",
  },
  shop_id: {
    type: "integer",
  },
  item_id: {
    type: "integer",
  },
  product_id: {
    type: "integer",
  },
  price: {
    type: "integer",
  },
  min_price: {
    type: "integer",
  },
  max_price: {
    type: "integer",
  },
  area: {
    type: "string",
  },
  stock: {
    type: "integer",
  },
  discount: {
    type: "string",
  },
  ratings: {
    type: "integer",
  },
  sold: {
    type: "integer",
  },
};

const properiKategori = {
  _id: {
    type: "string",
  },
  kategori_id: {
    type: "integer",
  },
  name: {
    type: "string",
  },
};

const propertiUser = {
  _id: {
    type: "string",
  },
  user_id: {
    type: "integer",
  },
  no_hp: {
    type: "string",
  },
  name: {
    type: "string",
  },
  api_key: {
    type: "string",
  },
};

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Daftar API",
      version: "0.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    tags: [
      {
        name: "Produk",
        description: "Endpoint terkait Produk",
      },
      {
        name: "User",
        description: "Endpoint terkait User",
      },
      {
        name: "Order",
        description: "Endpoint terkait Order",
      },
    ],
    paths: {
      // Produk ALl
      "/produk/all": {
        get: {
          summary: "Mengambil semua data produk",
          description:
            "Mengambil semua data pada tabel produk yang ada dalam database",
          parameters: [paramsApiKey, paramsPage, paramsPageSize],
          responses: {
            200: {
              description: "Berhasil mengambil data produk",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiProduk,
                    },
                  },
                },
              },
            },
          },
          tags: ["Produk"],
        },
      },

      // Produk By ID
      "/produk/{product_id}": {
        get: {
          summary: "Mengambil data kategori produk By ID produk",
          description:
            "Mengambil data pada tabel kategori yang ada dalam database berdasarkan id produk",
          parameters: [
            paramsApiKey,
            {
              name: "product_id",
              in: "path",
              required: true,
              description: "ID produk yang ingin diambil",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data produk",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiProduk,
                    },
                  },
                },
              },
            },
          },
          tags: ["Produk"],
        },
      },

      // Kategori Produk
      "/produk/kategori": {
        get: {
          summary: "Mengambil semua data kategori produk",
          description:
            "Mengambil semua data pada tabel kategori yang ada dalam database",
          parameters: [paramsApiKey, paramsPage, paramsPageSize],
          responses: {
            200: {
              description: "Berhasil mengambil data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: properiKategori,
                    },
                  },
                },
              },
            },
          },
          tags: ["Produk"],
        },
      },

      // Kategori Produk
      "/produk/kategori/{kategori_id}": {
        get: {
          summary: "Mengambil data kategori produk by id",
          description:
            "Mengambil data pada tabel kategori yang ada dalam database berdasarkan kategori id",
          parameters: [
            paramsApiKey,
            paramsPage,
            paramsPageSize,
            {
              name: "kategori_id",
              in: "path",
              required: true,
              description: "ID kategori produk yang ingin diambil",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data kategori",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: properiKategori,
                    },
                  },
                },
              },
            },
          },
          tags: ["Produk"],
        },
      },

      // Kategori Produk
      "/produk/search": {
        get: {
          summary: "Mengambil data kategori produk by name",
          description:
            "Mengambil data pada tabel kategori yang ada dalam database berdasarkan nama produk",
          parameters: [
            paramsApiKey,
            paramsPage,
            paramsPageSize,
            {
              name: "name",
              in: "query",
              required: true,
              description: "Nama produk yang ingin diambil",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data produk",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiProduk,
                    },
                  },
                },
              },
            },
          },
          tags: ["Produk"],
        },
      },

      // Kategori Produk
      "/produk/search/filter": {
        get: {
          summary: "Mengambil data kategori produk by name",
          description:
            "Mengambil data pada tabel kategori yang ada dalam database berdasarkan nama produk",
          parameters: [
            paramsApiKey,
            paramsPage,
            paramsPageSize,
            {
              name: "max_price",
              in: "query",
              required: false,
              description: "Harga maksimal dari produk",
              schema: {
                type: "integer",
              },
            },
            {
              name: "discount",
              in: "query",
              required: false,
              description: "Discount dari produk",
              schema: {
                type: "float",
              },
            },
            {
              name: "rating",
              in: "query",
              required: false,
              description: "Rating dari produk",
              schema: {
                type: "float",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data produk",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiProduk,
                    },
                  },
                },
              },
            },
          },
          tags: ["Produk"],
        },
      },

      // user ALl
      "/users/getAllUser": {
        get: {
          summary: "Mengambil semua data user",
          description:
            "Mengambil semua data pada tabel user yang ada dalam database",
          parameters: [paramsApiKey],
          responses: {
            200: {
              description: "Berhasil mengambil data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiUser,
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // user By id
      "/users/getUserById/{userId}": {
        get: {
          summary: "Mengambil semua data user",
          description:
            "Mengambil semua data pada tabel user yang ada dalam database",
          parameters: [
            paramsApiKey,
            {
              name: "userId",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiUser,
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // update user By id
      "/users/updateUser/{userId}": {
        put: {
          summary: "Update data user",
          description: "Update data pada tabel user yang ada dalam database",
          parameters: [
            paramsApiKey,
            {
              name: "userId",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    no_hp: {
                      type: "string",
                    },
                  },
                  required: ["name", "no_hp"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil mengubah data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiUser,
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // update user By id
      "/users/delete/{userId}": {
        delete: {
          summary: "Delete data user",
          description: "Delete data pada tabel user yang ada dalam database",
          parameters: [
            paramsApiKey,
            {
              name: "userId",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil menghapus data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiUser,
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // Register user
      "/users/registerUser": {
        post: {
          summary: "Registrasi data user",
          description:
            "Registrasi data pada tabel user yang ada dalam database",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    no_hp: {
                      type: "string",
                    },
                  },
                  required: ["name", "no_hp"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil registrasi data user",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: propertiUser,
                    },
                  },
                },
              },
            },
          },
          tags: ["User"],
        },
      },

      // GET API User
      // Tambahkan definisi jalur baru di dalam objek paths
      "/users/getApiKey/{no_hp}": {
        get: {
          summary: "Mendapatkan API Key berdasarkan nomor HP",
          description:
            "Mendapatkan API Key dari user berdasarkan nomor HP yang diberikan",
          parameters: [
            {
              name: "no_hp",
              in: "path",
              required: true,
              description: "Nomor HP user",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mendapatkan API Key",
              content: {
                "application/json": {
                  schema: {
                    type: "object", // Sesuaikan dengan respons yang diharapkan
                    properties: {
                      api_key: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description:
                "User dengan nomor HP yang diberikan tidak ditemukan",
            },
          },
          tags: ["User"], // Sesuaikan tag jika diperlukan
        },
      },

      // get all order
      "/order/getAllOrder": {
        get: {
          summary: "Mengambil data order",
          description:
            "Registrasi data pada tabel user yang ada dalam database",
          responses: {
            200: {
              description: "Berhasil mengambil data order",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "array",
                      properties: propertiOrder,
                    },
                  },
                },
              },
            },
          },
          tags: ["Order"],
        },
      },

      // get order by id
      "/order/getOrderById/{order_id}": {
        get: {
          summary: "Mengambil data order",
          description:
            "Registrasi data pada tabel user yang ada dalam database",
          parameters: [
            {
              name: "order_id",
              in: "path",
              required: true,
              description: "ID dari order",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil mengambil data order",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "array",
                      properties: propertiOrder,
                    },
                  },
                },
              },
            },
          },
          tags: ["Order"],
        },
      },

      // get order by id
      "/order/createOrder/{user_id}": {
        post: {
          summary: "Menambah data order",
          description: "Menambah data pada tabel user yang ada dalam database",
          parameters: [
            {
              name: "user_id",
              in: "path",
              required: true,
              description: "ID dari user",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  order_produk: [
                    {
                      product_id: {
                        type: "integer",
                      },
                      qty: {
                        type: "integer",
                      },
                    },
                  ],
                  required: ["order_produk"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil menambah data order",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "array",
                      properties: propertiOrder,
                    },
                  },
                },
              },
            },
          },
          tags: ["Order"],
        },
      },

      // update order by id
      "/order/editOrder/{order_id}": {
        put: {
          summary: "Mengubah data order",
          description: "MEngubah data pada tabel user yang ada dalam database",
          parameters: [
            {
              name: "order_id",
              in: "path",
              required: true,
              description: "ID dari order",
              schema: {
                type: "integer",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  order_produk: [
                    {
                      product_id: {
                        type: "integer",
                      },
                      qty: {
                        type: "integer",
                      },
                    },
                  ],
                  required: ["order_produk"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Berhasil menambah data order",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "array",
                      properties: propertiOrder,
                    },
                  },
                },
              },
            },
          },
          tags: ["Order"],
        },
      },

      // get order by id
      "/order/deleteOrder/{order_id}": {
        delete: {
          summary: "Menghapus data order",
          description: "Menghapus data pada tabel user yang ada dalam database",
          parameters: [
            {
              name: "order_id",
              in: "path",
              required: true,
              description: "ID dari order",
              schema: {
                type: "integer",
              },
            },
          ],
          responses: {
            200: {
              description: "Berhasil menghapus data order",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "array",
                      properties: propertiOrder,
                    },
                  },
                },
              },
            },
          },
          tags: ["Order"],
        },
      },
    },
  },
  apis: ["./app/**/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
