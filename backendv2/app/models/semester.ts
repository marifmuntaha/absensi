import { DateTime } from 'luxon'
import {afterCreate, afterUpdate, BaseModel, column, hasOne} from '@adonisjs/lucid/orm'
import Year from '#models/year'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Semester extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare year_id: number

  @column()
  declare name: string

  @column()
  declare start: Date

  @column()
  declare end: Date

  @column()
  declare active: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Year, {
    foreignKey: 'id',
    localKey: 'year_id',
  })
  declare year: HasOne<typeof Year>

  @afterCreate()
  static async afterCreateSemester(semester: Semester) {
    if (semester.active === '1') {
      const semesters = await Semester.all()
      for (const item of semesters) {
        if (item.id !== semester.id) {
          const update = await Semester.findOrFail(item.id)
          update.active = '2'
          await update.save()
        }
      }
    }
  }

  @afterUpdate()
  static async afterUpdateSemester(semester: Semester) {
    if (semester.active === '1') {
      const semesters = await Semester.all()
      for (const item of semesters) {
        if (item.id !== semester.id) {
          const update = await Semester.findOrFail(item.id)
          update.active = '2'
          await update?.save()
        }
      }
    }
  }
}
