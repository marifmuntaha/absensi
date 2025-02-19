import type { HttpContext } from '@adonisjs/core/http'
import School from '#models/school'
import { updateSchoolValidator } from '#validators/school'

export default class SchoolsController {
  async show({ params, response }: HttpContext) {
    try {
      const school = await School.findOrFail(params.id)
      return response.status(200).json({
        result: school,
      })
    } catch (error) {
      return response.badRequest(error)
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      data.image = request.file('image')
      const payload = await updateSchoolValidator.validate(data)
      if (payload.image) {
        const key = `images/logo.${data.image.extname}`
        await data.image.moveToDisk(key)
        payload.logo = key
        delete payload.image
      }
      const school = await School.findOrFail(payload.id)
      const update = await school.merge(payload).save()
      return response.status(200).json({
        message: 'Data Sekolah berhasil diperbarui.',
        result: update,
      })
    } catch (error) {
      console.log(error)
      return response.status(422).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }
}
