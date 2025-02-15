import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Semester from '#models/semester'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Holiday extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare semester_id: number

  @column()
  declare name: string

  @column.date()
  declare date: DateTime

  @column()
  declare description: string

  @hasOne(() => Semester, {
    foreignKey: 'id',
    localKey: 'semester_id',
  })
  declare semester: HasOne<typeof Semester>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
