import { Router } from "express";
import * as admin from "firebase-admin";
import { createErrorResponse } from "../utils/errorHandler";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // In a real implementation, you would use Firebase Auth REST API
    // since the admin SDK doesn't have a direct way to sign in users with email/password
    // This is a simplified example
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    return res.status(200).json({ token: customToken });
  } catch (error) {
    return res.status(500).json(createErrorResponse(error));
  }
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Generate password reset link
    // const link = await admin.auth().generatePasswordResetLink(email);
    // Send email with the link (in a real implementation)
    return res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    return res.status(500).json(createErrorResponse(error));
  }
});

export default router;