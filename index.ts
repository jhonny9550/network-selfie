import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (req: Request, res: Response) => {
  res.send("Endpoint working");
});

app.listen(port, host, () => {
  console.log(`Server running at port: https://${host}:${port}`);
});
