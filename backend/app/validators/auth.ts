import vine from '@vinejs/vine'

export const storeLoginValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
