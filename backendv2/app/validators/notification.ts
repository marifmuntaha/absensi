import vine from '@vinejs/vine'

export const storeNotificationValidator = vine.compile(
  vine.object({
    fromUser: vine.number(),
    toUser: vine.number(),
    type: vine.string(),
    status: vine.string(),
    message: vine.string(),
    read: vine.string(),
  })
)

export const updateNotificationValidator = vine.compile(
  vine.object({
    id: vine.number(),
    fromUser: vine.number(),
    toUser: vine.number(),
    type: vine.string(),
    status: vine.string(),
    message: vine.string(),
    read: vine.string(),
  })
)
