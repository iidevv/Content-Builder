import { Router } from "express";
import { authenticateJWT } from "../config/passport";
import { Templates } from "../controllers/templatesController";

const router = Router();

router.get("/templates", authenticateJWT, async (req, res) => {
  try {
    await Templates(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

export { router as templatesRouter };
