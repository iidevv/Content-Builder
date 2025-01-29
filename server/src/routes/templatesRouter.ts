import { Router } from "express";
import { authenticateJWT } from "../config/passport";
import {
  addTemplate,
  getTemplate,
  getTemplates,
} from "../controllers/templatesController";

const router = Router();

router.get("/templates", authenticateJWT, async (req, res) => {
  try {
    await getTemplates(req, res);
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

router.get("/templates/:id", authenticateJWT, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    await getTemplate(id, res);
  } catch (err) {
    console.error("Error fetching template:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
});

router.post("/templates/", authenticateJWT, async (req, res) => {
  try {
    await addTemplate(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

export { router as templatesRouter };
