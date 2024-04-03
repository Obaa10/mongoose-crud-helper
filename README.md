# Express Mongoose CRUD Helper

This package provides a convenient way to create CRUD (Create, Read, Update, Delete) routes for Mongoose models in Express.js applications.

## Installation

```bash
npm install em-crud
```


## Parameters

- `className`: Mongoose model class.
- `setMiddlewares`: Array of middleware functions to be executed before handling requests that modify data (POST, PUT, DELETE).
- `getMiddlewares`: Array of middleware functions to be executed before handling GET requests.


## Get All Features
| Feature       | Description                                                                                                          |
|---------------|----------------------------------------------------------------------------------------------------------------------|
| Count         | Retrieve the total count of documents based on specified query criteria.                                             |
| Sorting       | Sort the retrieved documents based on specified fields and order.                                                    |
| Limit Fields  | Select specific fields to be included or excluded from the retrieved documents.                                      |
| Pagination    | Enable paginated retrieval of documents, controlling the number of documents per page and navigating through pages. <br> Use `page` and `limit` query parameters to control pagination. |
| Population    | Populate referenced fields in the retrieved documents, enabling retrieval of associated data from other collections. |



## Usage

```javascript
import express from "express";
import CrudRouter from "em-crud";
import User from "./models/User.js"; // Import the Mongoose User model

const app = express();

// Create middleware functions
const setMiddlewares = [];
const getMiddlewares = [];

// Create a route to handle GET requests for users
app.get("/api/users", CrudRouter({ 
  className: User, 
  setMiddlewares, 
  getMiddlewares 
}));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
in the recent example any one can add and delete users because we did't set and setMiddlewares.
Now lets add some role for adding and deleting users.

```javascript
....
import AuthToken from "./middleware/authentication.js"; //Import our AuthToken middleware
import {admin} from "./middleware/authorization.js"; //Import admin authorization middleware

const setMiddlewares = [AuthToken,admin];
const getMiddlewares = [AuthToken];

// Create a route to handle GET requests for users
app.get("/api/users", CrudRouter({ 
  className: User, 
  setMiddlewares, 
  getMiddlewares 
}));
....
```
In this case only admin can add and delete users.
And all authorized users can use get by id and get all.

### The new auto generated APIs
#### Get One By Id
```
GET /api/users/:id
```
#### Create One
```
POST /api/users/
body:{
  full_name: "admin",
  email: "admin@gmail.com
}
```
#### Update One
```
PUT /api/users/:id
body:{
  full_name: "admin",
  email: "admin@gmail.com
}
```
#### Delete One
```
DELETE /api/users/:id
```
#### Get All With Filters
```
GET /api/users
query: {
  sort=-createdAt
  page=1
  limit=10
}
```