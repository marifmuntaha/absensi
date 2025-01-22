import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Presence from '#models/presence'
import moment from 'moment/moment.js'

export default class extends BaseSeeder {
  async run() {
    const startDate = moment('2025-01-01')
    const endDate = moment('2025-02-1')
    let query = []
    while (startDate.isBefore(endDate)) {
      query.push({
        teacherId: 2,
        date: startDate.format('YYYY-MM-DD'),
        in: '07:00:00',
        out: '13:30:00',
        statusIn: 'H',
        statusOut: 'H',
        description: '',
        letter: '',
      })
      startDate.add(1, 'days')
    }
    // @ts-ignore
    await Presence.createMany(query)
  }
}
