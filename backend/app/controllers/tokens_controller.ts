import type { HttpContext } from '@adonisjs/core/http'

import moment from 'moment'
import hash from '@adonisjs/core/services/hash'
import Token from '#models/token'

export default class TokensController {
  async index({ request, response }: HttpContext) {
    try {
      const token = Token.query()
      if (request.input('date')) {
        token.where('date', request.input('date'))
      }
      const tokens = await token.orderBy('date', 'desc')
      response.status(200).json({
        result: tokens,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0] : error,
      })
    }
  }

  async store() {
    const date = moment()
    const data = {
      date: date.format('YYYY-MM-DD HH:mm:ss'),
      token: hash.make(date.format('YYYY-MM-DD').toString()).toString(),
    }
    // @ts-ignore
    await Token.create(data)
  }
}
