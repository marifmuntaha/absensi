import type { HttpContext } from '@adonisjs/core/http'
import Year from '#models/year'
import { storeYearValidator, updateYearValidator } from '#validators/year'

export default class YearsController {
  async index({ request, response }: HttpContext) {
    try {
      let years
      if (request.input('active')) {
        years = await Year.findByOrFail('active', '1')
      } else {
        years = await Year.all()
      }
      return response.status(200).json({
        result: years,
      })
    } catch (err) {
      return response.status(422).json({
        message: err.messages ? err.messages[0].message : err,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storeYearValidator.validate(data)
      const createYear = await Year.create(payload)
      return response.status(201).json({
        message: 'Data Tapel berhasil disimpan.',
        result: createYear,
      })
    } catch (err) {
      return response.status(422).json({
        message: err.messages ? err.messages[0].message : err,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const year = await Year.findOrFail(params.id)
      return response.status(200).json({
        result: year,
      })
    } catch (err) {
      return response.status(422).json({
        message: err.messages ? err.messages[0].message : err,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updateYearValidator.validate(data)
      const year = await Year.findOrFail(payload.id)
      const updateYear = await year.fill(payload).save()
      return response.status(200).json({
        message: 'Data Tapel berhasil diperbarui.',
        result: updateYear,
      })
    } catch (err) {
      return response.status(422).json({
        message: err.messages ? err.messages[0].message : err,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const year = await Year.findOrFail(params.id)
      const yearDelete = await year.delete()
      return response.status(200).json({
        message: 'Data Tapel berhasil dihapus.',
        result: yearDelete,
      })
    } catch (err) {
      return response.status(422).json({
        message: err.messages ? err.messages[0].message : err,
      })
    }
  }
}
