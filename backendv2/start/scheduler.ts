import scheduler from 'adonisjs-scheduler/services/main'
import Teacher from '#models/teacher'

scheduler.command('inspire').everyFiveSeconds()

scheduler
  .call(async () => {
    const teachers = await Teacher.all()
    teachers.forEach((teacher: Teacher) => {
      console.log(teacher)
    })
  })
  .everyMinute()
