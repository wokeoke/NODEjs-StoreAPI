const Products = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({
    // featured: true,
    name: 'vase table',
  });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ message: 'Products Route' });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
