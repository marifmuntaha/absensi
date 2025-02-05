import { DateTime } from 'luxon'
import { afterCreate, afterUpdate, BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import QRCode from 'qrcode'
import app from '@adonisjs/core/services/app'
import drive from '@adonisjs/drive/services/main'
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

  @afterCreate()
  static async afterCreateTeacher(teacher: Teacher) {
    const sug = JSON.stringify(teacher)
    const path = app.makePath('storage/images/qrcode')
    const namePath = `${path}/${teacher.nuptk}.png`
    await QRCode.toFile(namePath, sug, {
      color: {
        dark: '#000000',
        light: '#0000',
      },
    }).then(async () => {
      teacher.qrcode = await drive.use().getUrl(`images/qrcode/${teacher.nuptk}.png`)
      await teacher.save()
    })
  }

  @afterUpdate()
  static async afterUpdateTeacher(teacher: Teacher) {
    const sug = JSON.stringify(teacher)
    const path = app.makePath('storage/images/qrcode')
    const namePath = `${path}/${teacher.nuptk}.png`
    await QRCode.toFile(namePath, sug, {
      color: {
        dark: '#000000',
        light: '#0000',
      },
    }).then(async () => {
      teacher.qrcode = await drive.use().getUrl(`images/qrcode/${teacher.nuptk}.png`)
      await teacher.save()
    })
  }
}
