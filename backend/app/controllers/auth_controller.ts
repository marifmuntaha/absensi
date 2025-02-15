import type { HttpContext } from '@adonisjs/core/http'
import { storeLoginValidator } from '#validators/auth'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storeLoginValidator.validate(data)
      const user = await User.findByOrFail('username', payload.username)
      if (user) {
        if (await hash.verify(user.password, payload.password)) {
          const token = await User.accessTokens.create(user)
          return response.status(200).json({
            message: 'Berhasil masuk, anda akan dialihkan dalam 2 detik',
            result: { user, token },
          })
        } else {
          return response.unauthorized('Nama Pengguna/Kata Sandi tidak tepat')
        }
      }
    } catch (error) {
      return response.unauthorized('Nama Pengguna/Kata Sandi tidak tepat')
    }
  }

  async logout({ request, response }: HttpContext) {
    try {
      const { id } = request.all()
      const auth = await User.findOrFail(id)
      await User.accessTokens.delete(auth, '1')
      return response.status(200).json({
        message: 'Berhasil Keluar',
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }
}
