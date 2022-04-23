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
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('name')
    .select('name price')
    .limit(30)
    .skip(0);
  res.status(200).json({ nbHits: products.length, products });
};

// DYNAMIC APPROACH
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
  }

  console.log(queryObject);
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

  // 23 products / limit 7 products per page
  //  4 pages / 7 7 7 2
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
