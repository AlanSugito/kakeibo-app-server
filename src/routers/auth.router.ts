import { Router } from "express";
import { AuthController } from "../controllers";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/login/google", AuthController.redirectToOAuth);
router.get("/login/google/callback", AuthController.loginWithOAuth2);

export default router;
