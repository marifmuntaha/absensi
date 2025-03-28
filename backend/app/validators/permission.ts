import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const storePermissionValidator = vine.compile(
  vine.object({
    teacherId: vine.number(),
    date: vine
      .date({
        formats: ['DD-MM-YYYY'],
      })
      .transform((date) => DateTime.fromJSDate(date)),
    status: vine.string(),
    description: vine.string(),
    letter: vine.string().optional(),
    accept: vine.string().optional(),
  })
)

export const updatePermissionValidator = vine.compile(
  vine.object({
    id: vine.number(),
    teacherId: vine.number(),
    date: vine
      .date({
        formats: ['DD-MM-YYYY'],
      })
      .transform((date) => DateTime.fromJSDate(date)),
    status: vine.string(),
    description: vine.string(),
    letter: vine.string().optional(),
    accept: vine.string().optional(),
  })
)
