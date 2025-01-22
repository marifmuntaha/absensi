import Permission from '#models/permission'
import { storeNotificationValidator } from '#validators/notification'
import Notification from '#models/notification'

export default class StoreNotification {
  async handlePermission(permission: Permission) {
    const permit = await Permission.query().preload('teacher').where('id', permission.id).first()
    const data = {
      fromUser: permit?.teacher?.user_id,
      toUser: '2',
      type: '1',
      status: '2',
      message: `Pengajuan Ijin ${permit?.teacher.name}`,
      read: '2',
    }
    const payload = await storeNotificationValidator.validate(data)
    await Notification.create(payload)
  }
}
