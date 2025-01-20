import type { HttpContext } from '@adonisjs/core/http'
import Work from '#models/work'
import { storeWorkValidator, updateWorkValidator } from '#validators/work'

export default class WorksController {
  async index({ response }: HttpContext) {
    try {
      const works = await Work.query().orderBy('day', 'asc')
      return response.status(200).json({
        result: works,
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
      const payload = await storeWorkValidator.validate(data)
      // @ts-ignore
      const storeWork = await Work.create(payload)
      return response.status(201).json({
        message: 'Data Jam berhasil disimpan.',
        result: storeWork,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const work = await Work.findOrFail(params.id)
      return response.status(200).json({
        result: work,
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
      const payload = await updateWorkValidator.validate(data)
      const work = await Work.findOrFail(payload.id)
      // @ts-ignore
      const updateWork = await work.fill(payload).save()
      return response.status(200).json({
        message: 'Data Jam berhasil diperbarui.',
        result: updateWork,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const work = await Work.findOrFail(params.id)
      const deleteWork = await work.delete()
      return response.status(200).json({
        message: 'Data Jam berhasil dihapus.',
        result: deleteWork,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
