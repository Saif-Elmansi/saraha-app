import chalk from "chalk"
import express from "express"
import userRouter, { routes as userRoutes } from "./modules/user/user.controller.js"
import { DBconnection } from "./DB/db.connection.js"
import UserModel from "./DB/Models/user.model.js"
const bootstrap = async () => {

    const app = express()
    app.use(express.json())
    const port = 3000

    await DBconnection()
    app.get("/", async (req, res, next) => {
        res.status(200).json({ msg: "hello world in API BACKEND" })
    })


    app.use(userRoutes.base, userRouter)

    app.use((req, res, next) => {
        res.status(404).json({ msg: "Route not found" });
    });

    app.use((err, req, res, next) => {
        const statusCode = err.cause?.statusCode || err.statusCode || 500;
        return res.status(statusCode).json({
            msg: err.message,
            statusCode,
        });
    });

    app.listen(port, (req, res, next) => {
        console.log(chalk.green(`server is running ${port}`));

    })
}
export default bootstrap