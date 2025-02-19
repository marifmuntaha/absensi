import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { storeUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return response.status(200).json({
        result: users,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storeUserValidator.validate(data)
      const storeUser = await User.create(payload)
      return response.status(201).json({
        message: 'Data Pengguna berhasil disimpan',
        result: storeUser,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.status(200).json({
        result: user,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updateUserValidator.validate(data)
      const user = await User.findOrFail(payload.id)
      const updateUser = await user.merge(payload).save()
      return response.status(200).json({
        message: 'Data Pengguna berhasil diperbarui',
        result: updateUser,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const deleteUser = await user.delete()
      return response.status(200).json({
        message: 'Data Pengguna berhasil dihapus',
        result: deleteUser,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }
}
