import { Router } from "express";
import passport from "passport";
import UsersController from '../controllers/users.js';

const router = Router();
const controller = new UsersController();

router.get("/", controller.renderSignup)
router.post("/", controller.savePicturesLocal, passport.authenticate('signup', { failureRedirect: "/signup/error", successRedirect: "/" }))
router.get("/error", controller.renderFailSignup);

export default router;