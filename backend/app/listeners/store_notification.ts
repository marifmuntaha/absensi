import { storeNotificationValidator } from '#validators/notification'
import Notification from '#models/notification'

export default class StoreNotification {
  async handle(data: Notification) {
    const payload = await storeNotificationValidator.validate(data)
    await Notification.create(payload)
  }
}
