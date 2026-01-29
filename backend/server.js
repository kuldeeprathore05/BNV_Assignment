import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import "./db/conn.js";       
import router from "./routes/router.js";

dotenv.config();

const app = express();
const PORT = 6005;
app.use(cors({
  origin: 'https://bnv-assignment-ten.vercel.app', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  credentials: true, // allow cookies if needed
}));

app.use(express.json());
 
app.use("/uploads", express.static("./uploads"));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});