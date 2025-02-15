import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import { updateNotificationValidator } from '#validators/notification'

export default class NotificationsController {
  async index({ request, response }: HttpContext): Promise<void> {
    try {
      const notification = Notification.query()
      request.input('toUser') && notification.where('toUser', request.input('toUser'))
      request.input('read') && notification.where('read', request.input('read'))
      const notifications = await notification.orderBy('updatedAt', 'asc')
      return response.status(200).json({
        result: notifications,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0] : error.message,
      })
    }
  }

  async update({ request, response }: HttpContext): Promise<void> {
    try {
      const data = request.all()
      const payload = await updateNotificationValidator.validate(data)
      const notification = await Notification.findOrFail(payload.id)
      const updateNotification = await notification.fill(payload).save()
      return response.status(200).json({
        result: updateNotification,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0] : error.message,
      })
    }
  }
}
