import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Presence from '#models/presence'
import env from "#start/env";

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare name: string

  @column()
  declare nip: string

  @column()
  declare nuptk: string

  @column()
  declare gender: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column({
    serialize: (value: string) =>
      `${env.get('PROTOCOL')}://${env.get('HOST')}:${env.get('PORT')}/uploads/${value}`,
  })
  declare image: string

  @column({
    serialize: (value: string) =>
      `${env.get('PROTOCOL')}://${env.get('HOST')}:${env.get('PORT')}/uploads/${value}`,
  })
  declare qrcode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'user_id',
  })
  declare user: HasOne<typeof User>

  @hasMany(() => Presence, {
    foreignKey: 'teacherId',
    localKey: 'id',
  })

  declare presences: HasMany<typeof Presence>
}
