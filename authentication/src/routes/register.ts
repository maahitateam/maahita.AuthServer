import { Router } from "express";
import * as admin from "firebase-admin";
import { createErrorResponse } from "../utils/errorHandler";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false
    });

    // You might want to create a document in Firestore for additional user data
    // await admin.firestore().collection('users').doc(userRecord.uid).set({
    //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
    //   role: 'user',
    //   // other fields...
    // });

    // Generate a custom token for the new user
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    
    return res.status(201).json({ 
      token: customToken,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      }
    });
  } catch (error) {
    return res.status(500).json(createErrorResponse(error));
  }
});

router.post("/verify-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Generate email verification link
    // const link = await admin.auth().generateEmailVerificationLink(email);
    // Send email with verification link (in a real implementation)
    return res.status(200).json({ message: "Email verification link sent successfully" });
  } catch (error) {
    return res.status(500).json(createErrorResponse(error));
  }
});

export default router;