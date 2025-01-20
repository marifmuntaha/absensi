import type { HttpContext } from '@adonisjs/core/http'
import Teacher from '#models/teacher'
import { storeTeacherValidator, updateTeacherValidator } from '#validators/teacher'
import drive from '@adonisjs/drive/services/main'
import moment from 'moment'

export default class TeachersController {
  async index({ request, response }: HttpContext) {
    try {
      let teacher = Teacher.query()
      if (request.input('presence')) {
        if (request.input('month') && request.input('year')) {
          const monthYear = `${request.input('month')}-${request.input('year')}`
          const date = moment(monthYear, 'M-YYYY')
          teacher.preload('presences', (query) => {
            query.whereBetween('date', [
              date.startOf('months').format('YYYY-MM-DD'),
              date.endOf('months').format('YYYY-MM-DD'),
            ])
          })
        }
      }
      if (request.input('user')) {
        teacher.preload('user')
      }
      const teachers = await teacher.orderBy('name', 'asc')
      return response.status(200).json({
        result: teachers,
      })
    } catch (error) {
      response.status(400).json({
        message: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await storeTeacherValidator.validate(data)
      const createTeacher = await Teacher.create(payload)
      return response.status(201).json({
        message: 'Data Guru berhasil disimpan.',
        result: createTeacher,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.message[0].message : error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const teacher = await Teacher.query().preload('user').where('id', params.id).first()
      return response.status(200).json({
        result: teacher,
      })
    } catch (error) {
      response.status(400).json({
        message: error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updateTeacherValidator.validate(data)
      const teacher = await Teacher.findOrFail(payload.id)
      const updateTeacher = await teacher.fill(payload).save()
      return response.status(200).json({
        message: 'Data Guru berhasil diperbarui.',
        result: updateTeacher,
      })
    } catch (error) {
      response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const teacher = await Teacher.findOrFail(params.id)
      await drive.use().delete(`images/qrcode/${teacher.nuptk}.png`)
      await teacher.delete()
      return response.status(200).json({
        message: 'Data Guru berhasil dihapus.',
        result: teacher,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
