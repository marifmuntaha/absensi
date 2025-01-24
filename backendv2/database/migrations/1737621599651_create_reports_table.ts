import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('teacher_id').unsigned().references('teachers.id').onDelete('CASCADE')
      table.date('date')
      table.string('number')
      table.text('value')
      table.enum('accept', ['1', '2', '3']).defaultTo('2')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
