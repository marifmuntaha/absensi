import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import env from '#start/env'

export default class School extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare email: string

  @column({
    serialize: (value: string) =>
      `${env.get('PROTOCOL')}://${env.get('HOST')}:${env.get('PORT')}/uploads/${value}`,
  })
  declare logo: string

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
