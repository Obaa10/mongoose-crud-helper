# Mongoose CRUD Helper

This package provides a convenient way to create CRUD (Create, Read, Update, Delete) routes for Mongoose models in Express.js applications.

## Installation

```bash
npm install mongoose-crud-helper
```

## Usage

```javascript
import express from "express";
import CrudRouter from "mongoose-crud-helper";
import YourModel from "./yourModel.js"; // Import your Mongoose model

const app = express();

// Example middleware functions
const setMiddlewares = [];
const getMiddlewares = [];

// Create CRUD routes for your model
app.use("/api/yourModel", CrudRouter({ 
  className: YourModel, 
  setMiddlewares, 
  getMiddlewares 
}));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Parameters

- `className`: Mongoose model class.
- `setMiddlewares`: Array of middleware functions to be executed before handling requests that modify data (POST, PUT, DELETE).
- `getMiddlewares`: Array of middleware functions to be executed before handling GET requests.
