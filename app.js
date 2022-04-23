require('dotenv').config();
// ASYNC ERRORS

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.get('/', (req, res) =>
  res.send('<h1>Store API</h1><a href="/api/v1/products">Product Route</a>')
);

// PRODUCTS ROUTE
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    // CONNECT_DB
    app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
