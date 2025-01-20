import { BaseSeeder } from '@adonisjs/lucid/seeders'
import School from '#models/school'

export default class extends BaseSeeder {
  async run() {
    await School.createMany([{ name: 'MA Darul Hikmah', phone: '082229366506' }])
  }
}
