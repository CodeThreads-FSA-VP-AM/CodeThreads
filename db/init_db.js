const {
  client,
  // declare your model imports here
  // for example, User
  User,
  Product,
} = require("./");
const { createProduct, editProduct } = require("./models/products");

const { createUser } = require("./models/user");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    try {
      console.log(`Dropping all tables....`);
      await client.query(`
      DROP TABLE IF EXISTS order_products CASCADE;
      DROP TABLE IF EXISTS wishlist_products CASCADE;
      DROP TABLE IF EXISTS product_tags CASCADE;
      DROP TABLE IF EXISTS tags CASCADE;
      DROP TABLE IF EXISTS reviews CASCADE;
      DROP TABLE IF EXISTS sizes CASCADE;
      DROP TABLE IF EXISTS wishlist CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      `);
      console.log(`finished dropping tables.`);
    } catch (error) {
      console.error(`Error dropping tables`);
      console.error(error);
    }

    // build tables in correct order

    try {
      console.log(`Starting to build tables...`);
      await client.query(`

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
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
        created_at TIMESTAMP DEFAULT NOW(),
        front_url TEXT,
        back_url TEXT
      );
        
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        is_cart BOOLEAN NOT NULL,
        purchased_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE wishlist (
        id SERIAL PRIMARY KEY,
        users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        is_wishlist BOOLEAN NOT NULL
      );
        

      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE product_tags (
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        UNIQUE (product_id, tag_id)
      );
        
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        rating INTEGER NOT NULL
      );
        
      CREATE TABLE sizes (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        small INTEGER, 
        medium INTEGER, 
        large INTEGER, 
        xlarge INTEGER

        );

      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        status VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE
      );

      CREATE TABLE wishlist_products (
        id SERIAL PRIMARY KEY,
        wishlist_id INTEGER REFERENCES wishlist(id) ON DELETE CASCADE,
        status VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE
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
        title: "yellow shirt",
        description: "daily drip",
        price: 9.99,
        front_url:
          "https://images.pexels.com/photos/1772476/pexels-photo-1772476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "womens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "black tank top",
        description: "nice to wear on hot days",
        price: 99.99,
        front_url:
          "https://images.pexels.com/photos/1772486/pexels-photo-1772486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "womens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "leggings",
        description: "delete me",
        price: 999.99,
        front_url:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["test", "tags", "here"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "black hoodie",
        description: "wear this even if its hot outside",
        price: 199.99,
        front_url:
          "https://images.pexels.com/photos/1445454/pexels-photo-1445454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "mens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "blue jean buttondown",
        description: "ok",
        price: 99.99,
        front_url:
          "https://images.pexels.com/photos/6508416/pexels-photo-6508416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "mens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "purple buttondown shirt",
        description: "got crazy drip",
        price: 59.99,
        front_url:
          "https://images.pexels.com/photos/2853529/pexels-photo-2853529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "mens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "red buttondown dress",
        description: "sometimes it can look nice",
        price: 399.99,
        front_url:
          "https://images.pexels.com/photos/8801074/pexels-photo-8801074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "womens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      {
        title: "pink fluffy jacket",
        description: "spiffy",
        price: 999.99,
        front_url:
          "https://images.pexels.com/photos/10073122/pexels-photo-10073122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tags: ["new", "featured", "womens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
      },
      // {
      //   title: "leather jacket",
      //   description: "punk rock 🤘",
      //   price: 799.99,
      //   front_url:
      //     "https://images.pexels.com/photos/4635407/pexels-photo-4635407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "blue jean jacket",
      //   description: "skater drip",
      //   price: 999.99,
      //   front_url:
      //     "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "orange pullover",
      //   description: "yooo check this out",
      //   price: 599.99,
      //   front_url:
      //     "https://images.pexels.com/photos/2584278/pexels-photo-2584278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "black buttondown shirt",
      //   description: "skater drip",
      //   price: 999.99,
      //   front_url:
      //     "https://images.pexels.com/photos/3214807/pexels-photo-3214807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "floral blouse",
      //   description: "floral design",
      //   price: 599.99,
      //   front_url:
      //     "https://images.pexels.com/photos/1848471/pexels-photo-1848471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "orange capris",
      //   description: "trendy",
      //   price: 599.99,
      //   front_url:
      //     "https://images.pexels.com/photos/3672825/pexels-photo-3672825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "black longsleeve croptop",
      //   description: "trendy",
      //   price: 599.99,
      //   front_url:
      //     "https://images.pexels.com/photos/2489986/pexels-photo-2489986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "white native shirt",
      //   description: "rustic",
      //   price: 599.99,
      //   front_url:
      //     "https://images.pexels.com/photos/2789817/pexels-photo-2789817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "black srsly shirt",
      //   description: "drip 💦",
      //   price: 599.99,
      //   front_url:
      //     "https://images.pexels.com/photos/2315303/pexels-photo-2315303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "yellow gym set",
      //   description: "drip 💦",
      //   price: 599.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      //   tags: ["soldout", "womens"],
      //   small: 0,
      //   medium: 0,
      //   large: 0,
      //   xlarge: 0,
      // },
      // {
      //   title: "fluffy black jacket",
      //   description: "fresh 💦",
      //   price: 299.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1629374029669-aab2f060553b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "black styled shirt",
      //   description: "fresh 💦",
      //   price: 399.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1626948683848-a20d8b769e3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "dark grey trench coat",
      //   description: "stranger danger 👤",
      //   price: 1999.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1616847220575-31b062a4cd05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["soldout", "womens"],
      //   small: 0,
      //   medium: 0,
      //   large: 0,
      //   xlarge: 0,
      // },
      // {
      //   title: "white tank top",
      //   description: "👀",
      //   price: 1999.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1611601679655-7c8bc197f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      //   tags: ["soldout", "womens"],
      //   small: 0,
      //   medium: 0,
      //   large: 0,
      //   xlarge: 0,
      // },
      // {
      //   title: "black oversized shirt",
      //   description: "get this on discount",
      //   price: 499.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1626948683538-fed29f226292?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      //   tags: ["new", "featured", "womens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "brown shortsleeve shirt",
      //   description: "new and affordable",
      //   price: 1999.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1531265180709-e9b5fb594ca6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
      //   tags: ["soldout", "mens"],
      //   small: 0,
      //   medium: 0,
      //   large: 0,
      //   xlarge: 0,
      // },
      // {
      //   title: "light grey shirt",
      //   description: "new and affordable",
      //   price: 499.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "lightblue jean jacket",
      //   description: "new and affordable",
      //   price: 399.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "light brown jacket",
      //   description: "new and affordable",
      //   price: 899.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "beige pullover",
      //   description: "new and affordable",
      //   price: 9999.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1613053341085-db794820ce43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "pink sweater",
      //   description: "yo check this out",
      //   price: 899.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1507253831417-37c43a944f51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["soldout", "mens"],
      //   small: 0,
      //   medium: 0,
      //   large: 0,
      //   xlarge: 0,
      // },
      // {
      //   title: "floral shirt",
      //   description: "new and affordable",
      //   price: 19999.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1517267367903-519607b9060c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      // {
      //   title: "grey blazer",
      //   description: "nerd",
      //   price: 199.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1555069519-127aadedf1ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["soldout", "mens"],
      //   small: 0,
      //   medium: 0,
      //   large: 0,
      //   xlarge: 0,
      // },
      // {
      //   title: "red flannel",
      //   description: "new and affordable",
      //   price: 99.99,
      //   front_url:
      //     "https://images.unsplash.com/photo-1434510423563-c7e99bbc5bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      //   tags: ["new", "featured", "mens"],
      //   small: 10,
      //   medium: 10,
      //   large: 10,
      //   xlarge: 10,
      // },
      {
        title: "black windbreaker",
        description: "fresh 👀",
        price: 699.99,
        front_url:
          "https://images.unsplash.com/photo-1536321116941-0fd6d4d7a23f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        tags: ["new", "featured", "mens"],
        small: 10,
        medium: 10,
        large: 10,
        xlarge: 10,
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

// const testEdit = async () => {
//   try {
//     const productsToEdit = [
//       {
//         productId: 1,
//         data: {
//           title: 'shorts',
//           description: 'comfy during the hot days',
//           price: 199.99,
//           front_url:
//             'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//           back_url:
//             'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//           tags: ['new tag'],
//           small: 1,
//           medium: 1,
//           large: 1,
//           xlarge: 1,
//         },
//       },
//       {
//         productId: 2,
//         title: 'sweatpants',
//         description: 'comfy when its cold',
//         price: 499.99,
//         front_url:
//           'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//         back_url:
//           'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//         tags: ['testing', 'new', 'tags'],
//         small: 1,
//         medium: 1,
//         large: 1,
//         xlarge: 1,
//       },
//     ];
//     const edit = await Promise.all(productsToEdit.map(editProduct));
//     console.log('editing products...');
//     console.log(edit);
//     console.log('edit products succesful...');
//   } catch (error) {
//     console.error(error);
//   }
// };

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
      {
        username: "delete",
        password: "delete",
        email: "delete@gmail.com",
        is_admin: false,
      },
      {
        username: "admin",
        password: "password",
        email: "admin@codethreads.com",
        is_admin: true,
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
  // .then(testEdit)
  .then(productToDelete)
  .catch(console.error)
  .finally(() => client.end());
