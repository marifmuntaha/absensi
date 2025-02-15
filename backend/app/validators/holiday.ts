import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const storeHolidayValidator = vine.compile(
  vine.object({
    semester_id: vine.number(),
    name: vine.string(),
    date: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    description: vine.string().optional(),
  })
)

export const updateHolidayValidator = vine.compile(
  vine.object({
    id: vine.number(),
    semester_id: vine.number(),
    name: vine.string(),
    date: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    description: vine.string().optional(),
  })
)
