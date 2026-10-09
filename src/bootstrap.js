import chalk from "chalk"
import express from "express"
import userRouter, { routes as userRoutes } from "./modules/user/user.controller.js"
import { DBconnection } from "./DB/db.connection.js"
import { providerEnum } from "./modules/user/user.types.js"
const bootstrap = async () => {

    const app = express()
    app.use(express.json())
    const port = 3000

    await DBconnection()
   


    app.get("/", (req, res, next) => {
        res.status(200).json({ msg: "hello world in API BACKEND" })
    })


    app.use(userRoutes.base, userRouter)




    app.listen(port, (req, res, next) => {
        console.log(chalk.green(`server is running ${port}`));

    })
}
export default bootstrap