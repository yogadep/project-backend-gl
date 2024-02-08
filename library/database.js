const express = require("express");
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

const uri = `mongodb+srv://mavin:mavin123@clustermvn.bmypgih.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;