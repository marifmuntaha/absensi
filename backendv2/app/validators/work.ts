import vine from '@vinejs/vine'

export const storeWorkValidator = vine.compile(
  vine.object({
    day: vine.string(),
    in: vine.date({
      formats: 'HH:mm:ss',
    }),
    out: vine.date({
      formats: 'HH:mm:ss',
    }),
  })
)
export const updateWorkValidator = vine.compile(
  vine.object({
    id: vine.number(),
    day: vine.string(),
    in: vine.date({
      formats: 'HH:mm:ss',
    }),
    out: vine.date({
      formats: 'HH:mm:ss',
    }),
  })
)
