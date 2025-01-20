/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import drive from '@adonisjs/drive/services/main'

const AuthController = () => import('#controllers/auth_controller')
const HolidayController = () => import('#controllers/holidays_controller')
const PresenceController = () => import('#controllers/presences_controller')
const SchoolController = () => import('#controllers/schools_controller')
const SemesterController = () => import('#controllers/semesters_controller')
const TeacherController = () => import('#controllers/teachers_controller')
const UserController = () => import('#controllers/users_controller')
const WorkController = () => import('#controllers/works_controller')
const YearController = () => import('#controllers/years_controller')

router.get('/', async () => {
  return {
    hello: 'API SISTEM ABSENSI ONLINE',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
      })
      .prefix('auth')
    router.get('test', async () => {
      await drive.use().delete('images/qrcode/1234512345123456.png')
    })
    router
      .group(() => {
        router
          .group(() => {
            router.resource('holiday', HolidayController).apiOnly()
            router.resource('school', SchoolController).only(['show', 'update'])
            router.resource('semester', SemesterController).apiOnly()
            router.resource('work', WorkController).apiOnly()
            router.resource('year', YearController).apiOnly()
          })
          .prefix('master')
        router.resource('presence', PresenceController).apiOnly()
        router.resource('teacher', TeacherController).apiOnly()
        router.resource('user', UserController).apiOnly()
      })
      .use(middleware.auth())
  })
  .prefix('api')
