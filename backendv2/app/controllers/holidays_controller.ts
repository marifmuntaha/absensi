import type { HttpContext } from '@adonisjs/core/http'
import Holiday from '#models/holiday'
import { storeHolidayValidator, updateHolidayValidator } from '#validators/holiday'
import moment from 'moment'

export default class HolidaysController {
  async index({ request, response }: HttpContext) {
    try {
      let holiday = Holiday.query()
      if (request.input('semester_id')) {
        holiday.preload('semester').where('semester_id', request.input('semester_id'))
      }
      if (request.input('month') && request.input('year')) {
        const { month, year } = request.all()
        const date = moment(`${month}-${year}`, 'M-YYYY')
        const startDate = date.startOf('month').format('YYYY-MM-DD')
        const endDate = date.endOf('month').format('YYYY-MM-DD')
        holiday.where('date', '>=', startDate).andWhere('date', '<=', endDate)
      }
      const holidays = await holiday.orderBy('date', 'asc')
      return response.status(200).json({
        result: holidays,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storeHolidayValidator.validate(data)
      const createHoliday = await Holiday.create(payload)
      return response.status(201).json({
        message: 'Hari Libur berhasil disimpan.',
        result: createHoliday,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const holiday = await Holiday.findOrFail(params.id)
      return response.status(200).json({
        result: holiday,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updateHolidayValidator.validate(data)
      const holiday = await Holiday.findOrFail(payload.id)
      const updateHoliday = await holiday.fill(payload).save()
      return response.status(200).json({
        message: 'Hari Libur berhasil diperbarui.',
        result: updateHoliday,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const holiday = await Holiday.findOrFail(params.id)
      const deleteHoliday = await holiday.delete()
      return response.status(200).json({
        message: 'Hari Libur berhasil dihapus.',
        result: deleteHoliday,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
