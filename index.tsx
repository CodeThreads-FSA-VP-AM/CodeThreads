require("dotenv").config();
const bodyParser = require("body-parser");

// This is the Web Server
const express = require("express");
const server = express();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST, {
  apiVersion: "2022-11-15",
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require("cors");
server.use(cors());

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

const YOUR_DOMAIN = "http://localhost:3000";

server.post("/payment", cors(), async (req: any, res: any) => {
  let { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment was successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

// server.post("/create-payment-intent", cors, async (req: any, res: any) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "USD",
//       amount: 1999,
//       automatic_payment_methods: { enabled: true },
//     });
//     console.log({ paymentIntent });
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (e) {
//     console.error(e);
//   }
// });

// server.post("/create-payment-intent", cors(), async (req: any, res: any) => {
//   console.log("Stripe");
//   res.send({ url: "stripe url" });
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: "price_1MkH2rHrkACoVWSGv1DQaKAE",
//         quantity: 5,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/completion`,
//     cancel_url: `${YOUR_DOMAIN}/completion`,
//   });

//   res.json({
//     url: session.url,
//   });
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
const handle = server.listen(PORT, "0.0.0.0", async () => {
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
