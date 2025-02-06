import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import app from '@adonisjs/core/services/app'
import QRCode from 'qrcode'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 days',
    prefix: 'oath_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 256,
  })

  @afterCreate()
  static async afterCreateTeacher(user: User) {
    if (user.role === '2') {
      const sug = JSON.stringify(user)
      const path = app.makePath('storage/images/qrcode')
      const namePath = `${path}/head.png`
      await QRCode.toFile(namePath, sug, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
      })
    }
  }
}
