import vine from '@vinejs/vine'

export const storeUserValidator = vine.compile(
  vine.object({
    name: vine.string(),
    username: vine.string().unique({
      table: 'users',
      column: 'username',
    }),
    email: vine.string().email(),
    password: vine.string().confirmed(),
    role: vine.string(),
  })
)
export const updateUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string(),
    username: vine.string().unique({
      table: 'users',
      column: 'username',
    }),
    email: vine.string().email(),
    password: vine.string().confirmed(),
    role: vine.string(),
  })
)
