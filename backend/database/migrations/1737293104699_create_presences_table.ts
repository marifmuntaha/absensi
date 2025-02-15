import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'presences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('teacher_id').unsigned().references('teachers.id').onDelete('CASCADE')
      table.date('date')
      table.time('in').nullable()
      table.time('out').nullable()
      table.enum('status_in', ['H', 'I', 'S', 'A']).defaultTo('A')
      table.enum('status_out', ['H', 'I', 'S', 'A']).defaultTo('A')
      table.string('description').nullable()
      table.string('letter').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
