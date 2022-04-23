const Product = require('../models/product');

// MANUAL APPROACH
const getAllProductsStatic = async (req, res) => {
  // const search = 'chair';
  // const products = await Product.find({
  //   // featured: true,
  //   // page: '2',
  //   // name: 'vase table',
  //   name: { $regex: search, $options: 'i' },
  // });

  const products = await Product.find({}).sort('name price');
  res.status(200).json({ nbHits: products.length, products });
};

// DYNAMIC APPROACH
const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
