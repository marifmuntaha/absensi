import type { HttpContext } from '@adonisjs/core/http'
import Teacher from '#models/teacher'
import { storeTeacherValidator, updateTeacherValidator } from '#validators/teacher'
import drive from '@adonisjs/drive/services/main'
import moment from 'moment'
import app from "@adonisjs/core/services/app";
import QRCode from "qrcode";

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
      if (request.input('userId')) {
        teacher.where('user_id', request.input('userId'))
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
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      data.file = request.file('image')
      const payload = await storeTeacherValidator.validate(data)
      if (payload.file) {
        const key = `images/placeholder/${payload.nuptk}.${data.file.extname}`
        await data.file.moveToDisk(key)
        payload.image = key
        delete payload.file
      }
      const createTeacher = await Teacher.create(payload)
      const sug = JSON.stringify(createTeacher)
      const path = app.makePath('storage/images/qrcode')
      const namePath = `${path}/${createTeacher.nuptk}.png`
      await QRCode.toFile(namePath, sug, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
      }).then(async () => {
        createTeacher.qrcode = `images/qrcode/${createTeacher.nuptk}.png`
        await createTeacher.save()
      })
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
      data.file = request.file('image')
      const payload = await updateTeacherValidator.validate(data)
      if (payload.file) {
        const key = `images/placeholder/${payload.nuptk}.${data.file.extname}`
        await data.file.moveToDisk(key)
        payload.image = key
        delete payload.file
      }
      const teacher = await Teacher.findOrFail(payload.id)
      const updateTeacher = await teacher.merge(payload).save()
      const sug = JSON.stringify(updateTeacher)
      const path = app.makePath('storage/images/qrcode')
      const namePath = `${path}/${updateTeacher.nuptk}.png`
      await QRCode.toFile(namePath, sug, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
      }).then(async () => {
        updateTeacher.qrcode = `images/qrcode/${updateTeacher.nuptk}.png`
        await updateTeacher.save()
      })
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
      await drive.use().delete(`images/placehlder/${teacher.nuptk}.png`)
      await drive.use().delete(`images/qrcode/${teacher.nuptk}.png`)
      await teacher.delete()
      return response.status(200).json({
        message: 'Data Guru berhasil dihapus.',
        result: teacher,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }
}
