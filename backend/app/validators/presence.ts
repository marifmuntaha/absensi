import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const storePresenceValidator = vine.compile(
  vine.object({
    teacher_id: vine.number(),
    date: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    in: vine.date({
      formats: 'HH:mm:ss',
    }),
    out: vine.date({
      formats: 'HH:mm:ss',
    }),
    status_in: vine.string(),
    status_out: vine.string().optional(),
    description: vine.string().optional(),
    letter: vine.string().optional(),
  })
)

export const updatePresenceValidator = vine.compile(
  vine.object({
    id: vine.number(),
    teacherId: vine.number(),
    date: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    in: vine.date({
      formats: 'HH:mm:ss',
    }),
    out: vine.date({
      formats: 'HH:mm:ss',
    }),
    statusIn: vine.string(),
    statusOut: vine.string(),
    description: vine.string().optional(),
    letter: vine.string().optional(),
  })
)
