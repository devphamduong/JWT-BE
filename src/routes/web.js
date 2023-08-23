import express from "express";
import { handleCreateUser, handleUserPage, hello, handleDeleteUser } from "../controllers/homeController";
import { testApi } from "../controllers/apiController";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", hello);
    router.get("/user", handleUserPage);
    router.post("/users/create-user", handleCreateUser);
    router.post("/users/delete-user:id", handleDeleteUser);
    router.get("/api/testApi", testApi);

    return app.use('/', router);
};

export default initWebRoutes;