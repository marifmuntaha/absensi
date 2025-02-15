import { DateTime } from 'luxon'
import {afterCreate, BaseModel, column} from '@adonisjs/lucid/orm'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare commonName: string

  @column()
  declare email: string

  @column()
  declare countryName: string

  @column()
  declare localityName: string

  @column()
  declare organizationName: string

  @column()
  declare password: string

  @column()
  declare cert: string

  @column()
  declare qrcode: string

  @column()
  declare active: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  static async afterCreateSignature(signature: Signature) {
    if (signature.active === '1') {
      const signatures = await Signature.all()
      for (const item of signatures) {
        if (item.id !== signature.id) {
          const update = await Signature.findOrFail(item.id)
          update.active = '2'
          await update.save()
        }
      }
    }
  }
}
