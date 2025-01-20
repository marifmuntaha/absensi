import type { HttpContext } from '@adonisjs/core/http'
import Semester from '#models/semester'
import { storeSemesterValidator, updateSemesterValidator } from '#validators/semester'

export default class SemestersController {
  async index({ request, response }: HttpContext) {
    try {
      let semesters
      if (request.input('active')) {
        semesters = await Semester.findByOrFail('active', '1')
      } else if (request.input('year_id')) {
        semesters = await Semester.query()
          .preload('year')
          .where('year_id', request.input('year_id'))
      } else {
        semesters = await Semester.query().preload('year')
      }
      return response.status(200).json({
        result: semesters,
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
      const payload = await storeSemesterValidator.validate(data)
      const createSemester = await Semester.create(payload)
      return response.status(201).json({
        message: 'Data Semester berhasil ditambahkan.',
        result: createSemester,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const semester = await Semester.findOrFail(params.id)
      return response.status(200).json({
        result: semester,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updateSemesterValidator.validate(data)
      const semester = await Semester.findOrFail(payload.id)
      const semesterUpdate = await semester.fill(payload).save()
      return response.status(200).json({
        message: 'Data Semester berhasil diperbarui.',
        result: semesterUpdate,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const semester = await Semester.findOrFail(params.id)
      await semester.delete()
      return response.status(200).json({
        message: 'Data Semester berhasil dihapus.',
        result: semester,
      })
    } catch (error) {
      return response.status(422).json({
        message: error.message,
      })
    }
  }
}
