import { Router } from "express";
import * as admin from "firebase-admin";
import { createErrorResponse } from "../utils/errorHandler";

const router = Router();

router.post("/google", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "Google ID Token is required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const customToken = await admin.auth().createCustomToken(decodedToken.uid);
    return res.status(200).json({ token: customToken });
  } catch (error) {
    return res.status(500).json(createErrorResponse(error));
  }
});

router.post("/facebook", async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Facebook Access Token is required" });
  }

  try {
    // Use Facebook's Graph API to verify the access token
    // Example: https://graph.facebook.com/v10.0/me?access_token=<ACCESS_TOKEN>
    const userRecord = await admin.auth().getUserByEmail("facebook_user@example.com"); // Replace as needed
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    return res.status(200).json({ token: customToken });
  } catch (error) {
    return res.status(500).json(createErrorResponse(error));
  }
});

export default router;