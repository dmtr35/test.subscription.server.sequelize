import 'dotenv/config'
import { Subscription, User } from '../models/models.js'
import path from 'path'
import fs from 'fs'
import util from 'util'
const __dirname = path.resolve()
import sequelize from "../db.js"
import filesService from '../service/file-service.js'





class SubscriptionControler {
    async createSubscription(req, res) {
        const { userId } = req.params
        const { userIdSubscribed } = req.body
        if (userId === userIdSubscribed) return
        const AmountSubscription = await Subscription.count({ where: { subscriber: userId } })
        if (AmountSubscription >= 150) return res.json('У вас максимальное количество подписок (150человек)')

        const response = await Subscription.create({ subscriber: userId, subscribed: userIdSubscribed, userUserId: userId })

        return res.json(response)

    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Create error' })
    }


    async deleteSubscription(req, res) {
        const { userId } = req.params
        const { userIdSubscribed } = req.body

        const response = await Subscription.destroy({ where: { subscriber: userId, subscribed: userIdSubscribed } })

        return res.json(response)

    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Delete error' })
    }


    async getAmountSubscription(req, res) {
        const { userId } = req.params

        const signed = await Subscription.findAll({ where: { subscriber: userId } })
        const signedId = signed.map(i => i.subscribed)
        const AmountMutual = await Subscription.count({ where: { subscriber: signedId, subscribed: userId } })
        return res.json(AmountMutual)

    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'error' })
    }


    async getZeroSubscribers(req, res) {
        const users = await User.findAll()
        const usersSubscriber = await Subscription.findAll()
        const usersId = users.map(i => i.user_id)
        const usersSubscriberId = usersSubscriber.map(i => i.subscriber)
        const usersZeroSubscribersId = usersId.filter(i => usersSubscriberId.indexOf(i) == -1)
        const usersZeroSubscribers = await User.findAll({ where: { user_id: usersZeroSubscribersId } })
        return res.json(usersZeroSubscribers)

    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'error' })
    }


    async getTopUsers(req, res) {
        const usersTable = {}
        const users = await User.findAll({ where: {}, raw: true })

        for (const user of users) {
            usersTable[user.user_id] = await Subscription.count({ where: { subscriber: user.user_id } })
        }

        const topUsersIds = Object.keys(usersTable).sort(function (a, b) { return usersTable[b] - usersTable[a] });
        topUsersIds.length = 5

        const top5Users = []

        topUsersIds.forEach((id, index) => {
            const result = users.find(user => String(user.user_id) === id)
            top5Users.push({[index + 1]: result})
        })

        return res.json(top5Users)

    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'error' })
    }


}

export default new SubscriptionControler()
