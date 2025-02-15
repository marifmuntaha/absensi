import type { HttpContext } from '@adonisjs/core/http'
import Report from '#models/report'
import { storeReportValidator, updateReportValidator } from '#validators/report'
import moment from 'moment/moment.js'
import 'moment/locale/id.js'
import User from '#models/user'
import emitter from '@adonisjs/core/services/emitter'

export default class ReportsController {
  async index({ auth, request, response }: HttpContext) {
    try {
      const report = Report.query()
      if (auth?.user?.role === '2') {
        report.preload('teacher')
      }
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

  async store({ auth, request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storeReportValidator.validate(data)
      const createReport = await Report.create(payload)
      const head = await User.query().where('role', '2').first()
      const createNotify = {
        fromUser: auth.user?.id,
        toUser: head?.id,
        type: '1',
        status: '2',
        message: `Pengajuan Tanda Tangan Absensi ${moment(createReport.date).locale('id').format('MM YYYY')} atas nama ${auth.user?.name}`,
        read: '2',
      }
      // @ts-ignore
      await emitter.emit('report:store', createNotify)
      return response.status(201).json({
        result: createReport,
      })
    } catch (error) {
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
      const updateReport = await report.fill(payload).save()
      return response.status(200).json({
        message:
          updateReport.accept === '1'
            ? 'Pengajuan berhasil disetujui'
            : 'Pengajuan berhasil ditolak',
        result: updateReport,
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
