import chalk from "chalk";
import mongoose from "mongoose"

export const DBconnection = async () => {
try {
        mongoose.connect('mongodb://127.0.0.1:27017/sarahaApp', {
        serverSelectionTimeoutMS: 5000
    });

    console.log(chalk.green("DB connection succ ❤️"));
    
} catch (error) {
        console.log(chalk.red("DB connection faild 😒🤦‍♀️"));
        

}
}