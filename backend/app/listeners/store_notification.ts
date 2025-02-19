import { storeNotificationValidator } from '#validators/notification'
import Notification from '#models/notification'
import transmit from "@adonisjs/transmit/services/main";

export default class StoreNotification {
  async handle(data: Notification) {
    const payload = await storeNotificationValidator.validate(data)
    await Notification.create(payload)
    const notifications = await Notification.query().where('read', '2').orderBy('updatedAt', 'desc')
    notifications.forEach((notification: Notification) => {
      transmit.broadcast(`notification/${notification.toUser}`, {message: notification.toJSON()})
    })
  }
}
