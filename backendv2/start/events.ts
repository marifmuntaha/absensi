import emmiter from '@adonisjs/core/services/emitter'
import Permission from '#models/permission'

const StoreNotification = () => import('#listeners/store_notification')

declare module '@adonisjs/core/types' {
  interface EventsList {
    'permission:store': Permission
  }
}
emmiter.on('permission:store', [StoreNotification, 'handlePermission'])
