require("dotenv").config();

// This is the Web Server
const express = require("express");
const server = express();

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require("cors");
server.use(
  cors({
    origin: "http://localhost:4000",
  })
);

const bodyParser = require("body-parser");
server.use(bodyParser.json());

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./api"));

// stripe
server.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:4000";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST, {
  apiVersion: "2022-11-15",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "stripe-samples/accept-a-payment",
    url: "https://github.com/stripe-samples",
    version: "0.0.2",
  },
  typescript: true,
});

server.post("/create-payment-intent", cors, async (req: any, res: any) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    console.log({ paymentIntent });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
  }
});

// server.post("/create-checkout-session", cors, async (req: any, res: any) => {
//   res.send({ url: "stripe url" });
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "price_1MkH2rHrkACoVWSGv1DQaKAE",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// by default serve up the react app if we don't recognize the route
server.use((req: any, res: { sendFile: (arg0: any) => void }, next: any) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// bring in the DB connection
const { client } = require("./db");

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
