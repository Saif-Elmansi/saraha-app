import UserModel from "../../DB/Models/user.model.js";
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