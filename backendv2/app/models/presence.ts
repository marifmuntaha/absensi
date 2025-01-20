import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Teacher from '#models/teacher'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Presence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare teacher_id: number

  @column()
  declare date: DateTime;

  @column()
  declare in: DateTime

  @column()
  declare out: DateTime

  @column()
  declare status_in: string

  @column()
  declare status_out: string

  @column()
  declare description: string

  @column()
  declare latter: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Teacher, {
    foreignKey: 'id',
    localKey: 'teacher_id',
  })
  declare teacher: HasOne<typeof Teacher>
}
