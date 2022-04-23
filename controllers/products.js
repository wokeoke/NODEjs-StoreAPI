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

  // const products = await Product.find({}).sort('name price');
  const products = await Product.find({}).select('name price');
  res.status(200).json({ nbHits: products.length, products });
};

// DYNAMIC APPROACH
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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

  // console.log(queryObject);
  let result = Product.find(queryObject);
  // SORT
  if (sort) {
    // console.log(sort);
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
