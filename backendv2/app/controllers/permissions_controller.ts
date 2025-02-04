import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import { storePermissionValidator, updatePermissionValidator } from '#validators/permission'
import drive from '@adonisjs/drive/services/main'
import { randomUUID } from 'node:crypto'
import emitter from '@adonisjs/core/services/emitter'
import User from '#models/user'
import moment from 'moment'

export default class PermissionsController {
  async index({ request, response }: HttpContext) {
    try {
      const permission = Permission.query()
      if (request.input('teacherId')) {
        permission.where('teacherId', request.input('teacherId'))
      }
      if (request.input('month') && request.input('year')) {
        const { month, year } = request.all()
        const date = moment(`${month}-${year}`, 'M-YYYY')
        const startDate = date.startOf('month').format('YYYY-MM-DD')
        const endDate = date.endOf('month').format('YYYY-MM-DD')
        permission.where('date', '>=', startDate).andWhere('date', '<=', endDate)
      }
      const permissions = await permission.orderBy('date', 'desc')
      return response.status(200).json({
        result: permissions,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const data = request.all()
      const file = request.file('image')
      const payload = await storePermissionValidator.validate(data)
      if (file) {
        const key = `images/teacher/permission/${payload.teacherId}-${randomUUID()}.${file.extname}`
        await file.moveToDisk(key)
        payload.letter = await drive.use().getUrl(key)
      }
      const createPermission = await Permission.create(payload)
      const administrator = await User.query().where('role', '2').first()
      const createNotify = {
        fromUser: auth.user?.id,
        toUser: administrator?.id,
        type: '1',
        status: '2',
        message: `Pengajuan Ijin ${auth.user?.name}`,
        read: '2',
      }
      // @ts-ignore
      await emitter.emit('permission:store', createNotify)
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

  async destroy({ params, response }: HttpContext) {
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
