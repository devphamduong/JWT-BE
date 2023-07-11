import express from "express";
import { hello } from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", hello);
    return app.use('/', router);
};

export default initWebRoutes;