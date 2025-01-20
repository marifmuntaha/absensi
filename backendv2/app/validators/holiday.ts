import vine from '@vinejs/vine'

export const storeHolidayValidator = vine.compile(
  vine.object({
    semester_id: vine.number(),
    name: vine.string(),
    date: vine.date(),
    description: vine.string().optional(),
  })
)

export const updateHolidayValidator = vine.compile(
  vine.object({
    id: vine.number(),
    semester_id: vine.number(),
    name: vine.string(),
    date: vine.date(),
    description: vine.string().optional(),
  })
)
