import { Router } from "express"
import { Timestamp } from "mongodb"
import { successRes } from "../../utils/success.res.js"
import { loginService, signupService } from "./user.service.js"

const router = Router()

export const routes = {
    base: "/users",
    signup: "/signup",//post
    login:"/login"//post

}

router.post(routes.signup, async (req, res, next) => {
    try {
        const data = await signupService(req.body);
        return successRes({ res, msg: "user created ", status: 201, data });
    } catch (error) {
        return next(error);
    }
})
router.post(routes.login, async (req, res, next) => {
    try {
        const data = await loginService(req.body);
        return successRes({ res, msg: "user succ ", status: 200, data });
    } catch (error) {
        return next(error);
    }
})


export default router