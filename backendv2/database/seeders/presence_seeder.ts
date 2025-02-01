import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Presence from '#models/presence'
import Teacher from '#models/teacher'
import { DateTime, Interval } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // @ts-ignore
    let query = []
    const teachers = await Teacher.all()
    const interval = Interval.fromDateTimes(
      DateTime.now().startOf('month'),
      DateTime.now().endOf('month')
    )
    const date = interval.splitBy({ day: 1 })
    teachers.map((teacher) => {
      date.map((d) => {
        query.push({
          teacherId: teacher.id,
          date: d.start,
          in: '07:00:00',
          out: '13:30:00',
          statusIn: 'H',
          statusOut: 'H',
          description: '',
          letter: '',
        })
      })
    })

    // @ts-ignore
    await Presence.createMany(query)
  }
}
