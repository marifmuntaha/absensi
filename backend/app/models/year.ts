import { DateTime } from 'luxon'
import { afterCreate, afterUpdate, BaseModel, column } from '@adonisjs/lucid/orm'

export default class Year extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare active: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  static async afterCreateYear(year: Year) {
    if (year.active === '1') {
      const years = await Year.all()
      for (const item of years) {
        if (item.id !== year.id) {
          const update = await Year.findOrFail(item.id)
          update.active = '2'
          await update.save()
        }
      }
    }
  }

  @afterUpdate()
  static async afterUpdateYear(year: Year) {
    if (year.active === '1') {
      const years = await Year.all()
      for (const item of years) {
        if (item.id !== year.id) {
          const update = await Year.findOrFail(item.id)
          update.active = '2'
          await update?.save()
        }
      }
    }
  }
}
