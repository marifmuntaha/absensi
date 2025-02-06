import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import Teacher from '#models/teacher'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import env from '#start/env'

export default class Presence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare teacherId: number

  @column.date()
  declare date: DateTime;

  @column()
  declare in: string

  @column()
  declare out: string

  @column()
  declare statusIn: string

  @column()
  declare statusOut: string

  @column()
  declare description: string

  @column()
  declare letter: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Teacher, {
    foreignKey: 'id',
    localKey: 'teacherId',
  })
  declare teacher: HasOne<typeof Teacher>

  @beforeCreate()
  static async mutatorLetter(presence: Presence): Promise<void> {
    presence.letter = presence.letter.replace(
      `${env.get('PROTOCOL')}://${env.get('HOST')}:${env.get('PORT')}/uploads/`,
      ''
    )
  }
}
