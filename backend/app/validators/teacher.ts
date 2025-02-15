import vine from '@vinejs/vine'

export const storeTeacherValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    name: vine.string(),
    nip: vine.string(),
    nuptk: vine.string(),
    gender: vine.string(),
    phone: vine.string(),
    address: vine.string(),
    image: vine.string().optional(),
  })
)
export const updateTeacherValidator = vine.compile(
  vine.object({
    id: vine.number(),
    user_id: vine.number(),
    name: vine.string(),
    nip: vine.string(),
    nuptk: vine.string(),
    gender: vine.string(),
    phone: vine.string(),
    address: vine.string(),
    image: vine.string().optional(),
  })
)
