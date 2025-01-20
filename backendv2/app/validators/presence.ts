import vine from '@vinejs/vine'

export const storePresenceValidator = vine.compile(
  vine.object({
    teacher_id: vine.number(),
    date: vine.date({
      formats: 'YYYY-MM-DD',
    }),
    in: vine.date({
      formats: 'HH:mm:ss',
    }),
    out: vine.date({
      formats: 'HH:mm:ss',
    }),
    status_in: vine.string(),
    status_out: vine.string(),
    description: vine.string().optional(),
    letter: vine.string().optional(),
  })
)

export const updatePresenceValidator = vine.compile(
  vine.object({
    id: vine.number(),
    teacher_id: vine.number(),
    date: vine.date(),
    in: vine.date({
      formats: 'HH:mm:ss',
    }),
    out: vine.date({
      formats: 'HH:mm:ss',
    }),
    status_in: vine.string(),
    status_out: vine.string(),
    description: vine.string().optional(),
    letter: vine.string().optional(),
  })
)
