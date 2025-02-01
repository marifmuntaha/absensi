import scheduler from 'adonisjs-scheduler/services/main'
import Teacher from '#models/teacher'
import { DateTime } from 'luxon'
import Presence from '#models/presence'

scheduler
  .call(async () => {
    const teachers = await Teacher.all()
    const date = DateTime.now()
    let query: Partial<{
      id: number
      teacherId: number
      date: DateTime<boolean>
      in: string
      out: string
      statusIn: string
      statusOut: string
      description: string
      letter: string
      createdAt: DateTime<boolean>
      updatedAt: DateTime<boolean>
    }>[] = []
    teachers.forEach((teacher: Teacher) => {
      query.push({
        teacherId: teacher.id,
        date: date,
        in: '07:00:00',
        out: '13:30:00',
        statusIn: 'H',
        statusOut: 'H',
        description: '',
        letter: '',
        createdAt: date,
        updatedAt: date,
      })
    })
    await Presence.createMany(query)
  })
  .everyHours(1)
