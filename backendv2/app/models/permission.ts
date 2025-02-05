import { DateTime } from 'luxon'
import { afterFetch, BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Teacher from '#models/teacher'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import env from '#start/env'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare teacherId: number

  @column.date()
  declare date: DateTime

  @column()
  declare status: string

  @column()
  declare description: string

  @column({
    serialize: (value: string) =>
      `${env.get('PROTOCOL')}://${env.get('HOST')}:${env.get('PORT')}/uploads/${value}`,
  })
  declare letter: string

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

  @afterFetch()
  public static beforeFetchHook(permission: Permission) {
    permission.letter = '1'
  }
}
