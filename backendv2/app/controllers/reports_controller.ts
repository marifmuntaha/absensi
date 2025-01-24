import type { HttpContext } from '@adonisjs/core/http'
import Report from '#models/report'
import { storeReportValidator, updateReportValidator } from '#validators/report'
import moment from 'moment/moment.js'

export default class ReportsController {
  async index({ request, response }: HttpContext) {
    try {
      const report = Report.query()
      if (request.input('teacherId')) {
        report.where('teacherId', request.input('teacherId'))
      }
      if (request.input('month') && request.input('year')) {
        const { month, year } = request.all()
        const date = moment(`${month}-${year}`, 'M-YYYY')
        report.where('date', date.startOf('months').format('YYYY-MM-DD'))
      }
      const reports = await report.orderBy('createdAt', 'desc')
      return response.status(200).json({
        result: reports,
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
      const payload = await storeReportValidator.validate(data)
      const createReport = await Report.create(payload)
      return response.status(201).json({
        result: createReport,
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const report = await Report.query().preload('teacher').where('id', params.id).first()
      return response.status(200).json({
        result: report,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updateReportValidator.validate(data)
      const report = await Report.findOrFail(payload.id)
      const updateRaport = await report.fill(payload).save()
      return response.status(200).json({
        result: updateRaport,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const report = await Report.findOrFail(params.id)
      const deleteReport = await report.delete()
      return response.status(200).json({
        result: deleteReport,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }
}
