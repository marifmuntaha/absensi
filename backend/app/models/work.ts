import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Work extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare day: string;

  @column()
  declare in: DateTime

  @column()
  declare out: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
