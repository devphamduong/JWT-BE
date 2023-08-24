import express from "express";
import { handleRegister } from "../controllers/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
    router.post("/register", handleRegister);

    return app.use('/api/v1/', router);
};

export default initApiRoutes;