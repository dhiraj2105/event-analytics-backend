import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

import eventRoutes from './routes/event.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.green("Connected to Mongodb"));
    app.listen(PORT, () => {
      console.log(chalk.green("SERVER STARTED"));
    });
  })
  .catch((err) => {
    console.log("Not connecting to mongodb");
  });

// Basic Logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});



// routes
app.use('/events', eventRoutes)
app.use('/analytics', analyticsRoutes)


