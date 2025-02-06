import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Teacher from '#models/teacher'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare teacherId: number

  @column.date()
  declare date: DateTime

  @column()
  declare number: string

  @column()
  declare value: string

  @column()
  declare accept: string

  @hasOne(() => Teacher, {
    foreignKey: 'id',
    localKey: 'teacherId',
  })
  declare teacher: HasOne<typeof Teacher>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
