import { DateTime } from 'luxon'
import {BaseModel, column} from '@adonisjs/lucid/orm'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fromUser: number

  @column()
  declare toUser: number

  @column()
  declare type: string

  @column()
  declare status: string

  @column()
  declare message: string

  @column()
  declare read: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}
