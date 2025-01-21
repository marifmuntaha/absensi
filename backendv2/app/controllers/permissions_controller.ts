import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import { storePermissionValidator, updatePermissionValidator } from '#validators/permission'
import drive from '@adonisjs/drive/services/main'

export default class PermissionsController {
  async index({ request, response }: HttpContext) {
    try {
      const permision = Permission.query()
      if (request.input('teacherId')) {
        permision.where('teacherId', request.input('teacherId'))
      }
      const permisions = await permision.orderBy('date', 'desc')
      return response.status(200).json({
        result: permisions,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const file = request.file('file')
      const payload = await storePermissionValidator.validate(data)
      if (file) {
        const key = `images/teacher/permission/${payload.teacherId}-${payload.date}.${file.extname}`
        await file.moveToDisk(key)
        payload.letter = await drive.use().getUrl(key)
      }
      const createPermission = Permission.create(payload)
      return response.status(201).json({
        message: 'Data Perijinan berhasil diajukan.',
        result: createPermission,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const permission = await Permission.findOrFail(params.id)
      return response.status(200).json({
        result: permission,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await updatePermissionValidator.validate(data)
      const permission = await Permission.findOrFail(payload.id)
      const updatePermission = await permission.fill(payload).save()
      return response.status(200).json({
        message: 'Data Perijinan berhasil diperbarui.',
        result: updatePermission,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const permission = await Permission.findOrFail(params.id)
      await permission.delete()
      return response.status(200).json({
        message: 'Data Perijinan berhasil dihapus.',
        result: permission,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
