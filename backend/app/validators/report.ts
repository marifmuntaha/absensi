import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const storeReportValidator = vine.compile(
  vine.object({
    teacherId: vine.number(),
    number: vine.string().optional(),
    date: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    value: vine.string(),
    accept: vine.string().optional(),
  })
)

export const updateReportValidator = vine.compile(
  vine.object({
    id: vine.number(),
    teacherId: vine.number(),
    date: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    number: vine.string(),
    value: vine.string(),
    accept: vine.string(),
  })
)
