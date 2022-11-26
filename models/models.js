import sequelize from "../db.js"
import { DataTypes } from "sequelize";


const User = sequelize.define('user', {
    // (тип поля числовой, первичный ключ будет автоинкрементироваться)
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    // (тип поля строчный, уникальное значение)
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
})

const Subscription = sequelize.define('subscription', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subscriber: { type: DataTypes.INTEGER, primaryKey: true },
    subscribed: { type: DataTypes.INTEGER, primaryKey: true }
})


User.hasMany(Subscription)             // один пользователь может иметь несколько подписок. (один ко многим)
Subscription.belongsTo(User)



export { User, Subscription }