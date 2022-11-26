import Router from "express"
import subscriptionControler from "../controllers/subscription-controler.js"
import authMiddleware from '../middlewares/auth-middleware.js'
const subscriptionRouter = new Router()



subscriptionRouter.post('/createSubscription/:userId', subscriptionControler.createSubscription)

subscriptionRouter.post('/deleteSubscription/:userId', subscriptionControler.deleteSubscription)

subscriptionRouter.get('/getAmountSubscription/:userId', subscriptionControler.getAmountSubscription)

subscriptionRouter.get('/getZeroSubscribers/', subscriptionControler.getZeroSubscribers)

subscriptionRouter.get('/getTopUsers/', subscriptionControler.getTopUsers)

// subscriptionRouter.post('/deleteManyCollection/', subscriptionControler.deleteManyCollection)

// subscriptionRouter.post('/createFromFile/:userId', subscriptionControler.createFromFile)


export default subscriptionRouter