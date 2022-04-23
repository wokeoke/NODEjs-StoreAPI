require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // Delete existing files in Database
    await Product.deleteMany();
    console.log('Delete');
    // Insert new files to Database
    await Product.create(jsonProducts);
    console.log('Success!');
    // Stop Terminal
    // (0) stop everything if the process is success
    process.exit(0);
  } catch (error) {
    console.log(error);
    // (1) if there is an error the terminal should catch the error
    process.exit(1);
  }
};

// package.json - "scripts" - "populate": "node populate.js"
// terminal - npm run populate
start();
