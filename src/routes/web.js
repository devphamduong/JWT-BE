import express from "express";
import { handleCreateUser, handleUserPage, hello } from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", hello);
    router.get("/user", handleUserPage);
    router.post("/users/create-user", handleCreateUser);

    return app.use('/', router);
};

export default initWebRoutes;