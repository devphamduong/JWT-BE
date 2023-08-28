import express from "express";
import { handleRegister, handleLogin } from "../controllers/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);

    return app.use('/api/v1/', router);
};

export default initApiRoutes;