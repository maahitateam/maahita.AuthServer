import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import registerRoutes from "./routes/register";
import loginRoutes from "./routes/login";
import socialSignInRoutes from "./routes/socialSignIn";

admin.initializeApp();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
app.use(cors({ origin: true }));

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan('combined'));

// Request body parser for URL encoded form data
app.use(express.urlencoded({ extended: true }));

// Register atomic route handlers
app.use("/auth/register", registerRoutes);
app.use("/auth/login", loginRoutes);
app.use("/auth/social", socialSignInRoutes);

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);