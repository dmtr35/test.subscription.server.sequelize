import 'dotenv/config'
import express from "express"
import sequelize from "./db.js"
import authRouter from "./router/auth-router.js"
import subscriptionRouter from "./router/subscription-router.js"
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
const __dirname = path.resolve()



const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,                                                     // разрешаем кукки
    origin: true                                                          // URL нашего фронтенда
}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/auth', authRouter)
app.use('/subscription', subscriptionRouter)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    next();
})




const start = async () => {
    try {
        await sequelize.authenticate()                     // подключение к базе данных
        await sequelize.sync()                             // сверяет состояние базы данных с схемой данных
        app.listen(PORT, () => console.log(`Server working, PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()


