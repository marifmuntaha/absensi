import vine from '@vinejs/vine'

export const updateSchoolValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string(),
    phone: vine.string(),
    address: vine.string(),
    email: vine.string(),
    type: vine.string(),
    logo: vine.string().optional(),
  })
)
