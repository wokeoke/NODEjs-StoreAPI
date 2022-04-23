const Product = require('../models/product');

// MANUAL APPROACH
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    // featured: true,
    name: 'vase table',
  });
  res.status(200).json({ nbHits: products.length, products });
};

// DYNAMIC APPROACH
const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
