import express, { Response } from "express";
import { writeFileSync } from "fs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import AppError from "./utils/app.error";
import { generateFileName } from "./utils/file.utils";

// Define constant values
const IMAGES_DIR = "public/images";
const DEFAULT_HOST = "0.0.0.0";
const DEFAULT_PORT = "3000";

// Load .env
dotenv.config();

// Init express server and configure cors
const app = express();
app.use(cors());

// Define http server config values
const port = parseInt(process.env.PORT || DEFAULT_PORT, 10);
const host = process.env.HOST || DEFAULT_HOST;

// Create a multer storage that stores files in memory
const multerStorage = multer.memoryStorage();

// Create the multer middleware to handle multipart/form-data file requests
const uploadFiles = multer({ storage: multerStorage });

// Check server status endpoint
app.get("/", (_, res: Response) => {
  res.status(200).send("API working");
});

// Endpoint to upload the photo
app.post("/photo", uploadFiles.single("selfie"), (req, res) => {
  // If no file return an error
  if (!req.file)
    return new AppError("Missing image! Please upload an image", 400);

  // Build file name and path
  const fileName = generateFileName(req.file);
  const filePath = `${IMAGES_DIR}/${fileName}`;

  try {
    // Store image in the public folder
    writeFileSync(filePath, req.file.buffer);

    // Return success response
    res.status(200).send("Image stored correctly");
  } catch (error) {
    // Return an error
    return new AppError("Error storing your image", 500, error);
  }
});

// Start the server
app.listen(port, host, () => {
  console.log(`Server running at port: https://${host}:${port}`);
});
