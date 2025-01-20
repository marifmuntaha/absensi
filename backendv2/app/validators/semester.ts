import vine from '@vinejs/vine'

export const storeSemesterValidator = vine.compile(
  vine.object({
    year_id: vine.number(),
    name: vine.string(),
    start: vine.date(),
    end: vine.date(),
    active: vine.string(),
  })
)

export const updateSemesterValidator = vine.compile(
  vine.object({
    id: vine.number(),
    year_id: vine.number(),
    name: vine.string(),
    start: vine.date(),
    end: vine.date(),
    active: vine.string(),
  })
)
