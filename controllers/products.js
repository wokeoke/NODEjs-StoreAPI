const Product = require('../models/product');

// MANUAL APPROACH
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    // featured: true,
    // name: 'vase table',
    page: '2',
  });
  res.status(200).json({ nbHits: products.length, products });
};

// DYNAMIC APPROACH
const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
