import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
// import Routes from "./src/routes/index";
import path from "path";
import cors from "cors";
import prisma from "./src/db";
import Routes from "./src/routes";

const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api/v1", Routes);

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`Server running on port ${PORT}`);
});
