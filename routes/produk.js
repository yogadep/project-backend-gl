var express = require("express");
var router = express.Router();
const produkController = require("../controller/produkController");
var verif = require("../library/verif");

router.get("/all", verif.cekAPI, produkController.getAllProduk);
router.get("/kategori",  verif.cekAPI,produkController.getAllKategori);
router.get("/kategori/:kategori_id",  verif.cekAPI,produkController.getProdukByKategoriId);
router.get("/area/:area",  verif.cekAPI,produkController.getProdukByArea);
router.get(`/search`,  verif.cekAPI,produkController.getProdukByName);
router.get('/:product_id',  verif.cekAPI,produkController.getProdukById);
router.get("/search/filter",  verif.cekAPI,produkController.getProdukByFiltering);

module.exports = router;
