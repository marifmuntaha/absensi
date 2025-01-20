import type { HttpContext } from '@adonisjs/core/http'
import Presence from '#models/presence'
import { storePresenceValidator, updatePresenceValidator } from '#validators/presence'

export default class PresencesController {
  async index({ response }: HttpContext) {
    try {
      const presences = await Presence.all()
      return response.status(200).json({
        result: presences,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storePresenceValidator.validate(data)
      // @ts-ignore
      const createPresence = await Presence.create(payload)
      return response.status(201).json({
        message: 'Data Presensi berhasil disimpan',
        result: createPresence,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const presence = await Presence.findOrFail(params.id)
      return response.status(200).json({
        result: presence,
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
      const payload = await updatePresenceValidator.validate(data)
      const presence = await Presence.findOrFail(payload.id)
      // @ts-ignore
      const updatePresence = await presence.fill(payload).save()
      return response.status(200).json({
        message: 'Data Presensi berhasil diperbarui',
        result: updatePresence,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const presence = await Presence.findOrFail(params.id)
      const deletePresence = await presence.delete()
      return response.status(200).json({
        message: 'Data Presensi berhasil dihapus',
        result: deletePresence,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
