import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Teacher from '#models/teacher'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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

  @hasMany(() => Teacher, {
    foreignKey: 'id',
    localKey: 'teacherId',
  })
  declare teacher: HasMany<typeof Teacher>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
