import emmiter from '@adonisjs/core/services/emitter'
import Notification from '#models/notification'

const StoreNotification = () => import('#listeners/store_notification')

declare module '@adonisjs/core/types' {
  interface EventsList {
    'permission:store': { froUser: string; toUser: string }
    'report:store': Notification
  }
}
// @ts-ignore
emmiter.on('permission:store', [StoreNotification, 'handle'])
// @ts-ignore
emmiter.on('report:store', [StoreNotification, 'handle'])
