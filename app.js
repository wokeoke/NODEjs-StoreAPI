require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.get('/', (req, res) =>
  res.send(
    '<h1>Store API</h1><ul><li><a href="/api/v1/products">Product Route</a></li><li><a href="/api/v1/products/static">Product Testing Route</a></li></ul>'
  )
);

app.use('/api/v1/products', productsRouter);

// PRODUCTS ROUTE
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
