import { model, Schema } from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../modules/user/user.types.js";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "الاسم الأول مطلوب"],
            trim: true,
            minlength: [3, "اسم الاول يجب ألا يقل عن 3 أحرف"],
            maxlength: [30, "اسم الاول يجب ألا يزيد عن 30 حرف"],
        },
        lastName: {
            type: String,
            required: [true, "الاسم الأخير مطلوب"],
            trim: true,
            minlength: [3, "اسم الاخير يجب ألا يقل عن 3 أحرف"],
            maxlength: [30, "اسم الاخير يجب ألا يزيد عن 30 حرف"],
        },
        email: {
            type: String,
            required: [true, "البريد الإلكتروني مطلوب"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "يرجى إدخال بريد إلكتروني صالح",
            ],
        },
        phone: {
            type: String,
            required: true,
            trim: true
        }
        ,
        password: {
            type: String,
            required: [true, "كلمة المرور مطلوبة"],
            minlength: [6, "كلمة المرور يجب ألا تقل عن 6 أحرف"],
        },
        age: {
            type: Number,
            min: [10, "الحد الأدنى للعمر هو 10 سنوات"],
            max: [100, "الحد الأقصى للعمر هو 100 سنة"],
        }
        ,
        profileImage: {
            type: String,
            default: "", // رابط الصورة بعد رفعها على Cloudinary مثلاً
        },
        isConfirmed: {
            type: Date,
        },
        gender: {
            type: Number,
            enum: Object.values(genderEnum),
            default: genderEnum.male
        },
        role: {
            type: Number,
            enum: Object.values(roleEnum),
            default: roleEnum.User

        },
        provider: {
            type: Number,
            enum: Object.values(providerEnum),
            default: providerEnum.system
        },
        bio: String,
        blockedAt: {
            type: Date
        }

    },
    {
        timestamps: true, // يضيف createdAt و updatedAt تلقائياً
        strict: true,
        strictQuery: true,
        optimisticConcurrency: true,
        toJSON: {
            virtuals: true,
            getters: true,
            transform(doc, ret) {
                delete ret.id
                delete ret.password
                return ret
            }
        },
        toObject: {
            virtuals: true,
            getters: true,
            transform(doc, ret) {
                delete ret.id
                return ret
            }
        },
        virtuals: {
            fullName: {
                get() {
                    return `${this.firstName} ${this.lastName}`;
                },
                set(value) {
                    if (!value || typeof value !== "string") {
                        throw new Error("in-valid fullname");
                    }
                    const parts = value.trim().split(/\s+/);
                    const firstName = parts[0];
                    const lastName = parts.slice(1).join(" ");

                    if (!firstName || !lastName) {
                        throw new Error("in-valid fullname");
                    }

                    this.set("firstName", firstName);
                    this.set("lastName", lastName);
                }
            },
        }
    }
);

const UserModel = model("User", userSchema);

export default UserModel;