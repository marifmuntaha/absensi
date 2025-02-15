import vine from '@vinejs/vine'

export const storeYearValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string(),
    active: vine.string(),
  })
)

export const updateYearValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string(),
    description: vine.string(),
    active: vine.string(),
  })
)
