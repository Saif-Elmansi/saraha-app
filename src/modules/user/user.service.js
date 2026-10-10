import UserModel from "../../DB/Models/user.model.js";
import jwt from "jsonwebtoken";
import { errorRes } from "../../utils/error.res.js";

export async function signupService(userData) {
    const { fullName, email, password, phone, age, gender, bio, userName } = userData;
    const isExist = await UserModel.findOne({
        $or: [{ email }, { userName }]
    });

    if (isExist) {
        if (isExist.email === email) {
            return errorRes({ msg: "email already exists", statusCode: 400 })
        }
        if (isExist.userName === userName) {
            return errorRes({ msg: "userName already exists", statusCode: 400 })

        }
    }

    const user = await UserModel.create(
        { fullName, email, password, phone, age, gender, bio, userName }
    )


    return {
        data: user
    }
}



export async function loginService(userData) {
    const { identifier, password } = userData

    const user = await UserModel.findOne({
        $or: [
            { email: identifier },
            { userName: identifier }
        ]
    })
    console.log(user);
    if (!user) {
        errorRes({
            msg: "invalid credentials",
            statusCode: 400
        })
    }

    if (user.password != password) {
        errorRes({
            msg: "invalid credentials",
            statusCode: 400

        })
    }

    const accessToken = jwt.sign({
        _id: user._id,
        email: user.email

    }, "accessToke_nalfdsadasmsp;mass")

    return {
        token: accessToken
    }

}