const {
  client,
  // declare your model imports here
  // for example, User
  User,
  Product,
} = require("./");
const { createProduct, editProduct, deleteProduct } = require("./models/products");

const { createUser } = require("./models/user");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    try {
      console.log(`Dropping all tables....`);
      await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS sizes;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS images;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      `);
      console.log(`finished dropping tables.`);
    } catch (error) {
      console.error(`Error dropping tables`);
    }

    // build tables in correct order

    try {
      console.log(`Starting to build tables...`);
      await client.query(`

      CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       is_admin BOOLEAN DEFAULT false,
       avatar_url TEXT
       );
       
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
        
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        users_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        status VARCHAR(255) NOT NULL,
        purchased_at TIMESTAMP DEFAULT NOW()
      );
        
        CREATE TABLE images (
          id SERIAL PRIMARY KEY,
          users_id INTEGER REFERENCES users(id),
          product_id INTEGER REFERENCES products(id),
          front_url TEXT,
          back_url TEXT
      );

      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        name VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        users_id INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        rating INTEGER NOT NULL
        );
        
        CREATE TABLE sizes (
          id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        small INTEGER, 
        medium INTEGER, 
        large INTEGER, 
        xlarge INTEGER
        );
        CREATE TABLE cart (
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          order_id INTEGER REFERENCES orders(id),
          quantity INTEGER NOT NULL
      )
      
      `);
      console.log(`Finished building tables.`);
    } catch (error) {
      console.error(`Error building tables.`);
      console.error(error);
    }
  } catch (error) {
    throw error;
  }
}

const populateInitialData = async () => {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
};
const createInitialProducts = async () => {
  try {
    const productsToCreate = [
      {
        title: "shirt",
        description: "daily drip",
        price: 9.99,
      },
      {
        title: "hoodie",
        description: "wear even if its hot outside",
        price: 99.99,
      },
      {
        title: "leggings",
        description: "delete me",
        price: 999.99,
      },
      {
        title: "tank top",
        description: "so buff",
        price: 9999.99,
      },
      {
        title: "skinny jeans",
        description: "ok",
        price: 99.99,
      },
      {
        title: "cargo pants",
        description: "got this in camo?",
        price: 59.99,
      },
      {
        title: "longsleeve shirt",
        description: "sometimes it can look nice",
        price: 399.99,
      },
      {
        title: "button down shirt",
        description: "spiffy",
        price: 999.99,
      },
      {
        title: "leather jacket",
        description: "punk rock 🤘",
        price: 9999.99,
      },
    ];
    const product = await Promise.all(productsToCreate.map(createProduct));
    console.log("creating products...");
    console.log(product);
    console.log("finished creating products...");
  } catch (error) {
    console.error(error);
  }
};

const testEdit = async () => {
  try {
    const productsToEdit = [
      {
        id: 1,
        title: "shorts",
        description: "comfy during the hot days",
        price: 199.99,
      },
      {
        id: 2,
        title: "sweatpants",
        description: "comfy when its cold",
        price: 499.99,
      },
    ];
    const edit = await Promise.all(productsToEdit.map(editProduct));
    console.log("editing products...");
    console.log(edit);
    console.log("edit products succesful...");
  } catch (error) {
    console.error(error);
  }
};

const productToDelete = async () => {
  try {
    const deleteProductId = 3;
    const deletedProduct = await Product.deleteProduct(deleteProductId);
    console.log("deleting product...");
    if (deletedProduct === undefined) {
      console.log(`successfully deleted product ${deleteProductId}...`);
    }
  } catch (error) {
    console.error(error);
  }
};

const createInitialUsers = async () => {
  try {
    const usersToCreate = [
      {
        username: "JohnDoe",
        password: "JohnDoe1",
        email: "johndoe1@gmail.com",
        is_admin: false,
      },
      {
        username: "JaneDoe",
        password: "JameDoe1",
        email: "janedoe1@gmail.com",
        is_admin: false,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users Created!");
    console.log(users);
    console.log(`Finished creating users!`);
  } catch (error) {
    console.error("Error creating users..");
    console.error(error);
  }
};

buildTables()
  .then(createInitialUsers)
  .then(createInitialProducts)
  .then(testEdit)
  .then(productToDelete)
  .catch(console.error)
  .finally(() => client.end());
