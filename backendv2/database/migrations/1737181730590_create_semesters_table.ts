import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'semesters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('year_id').unsigned().references('years.id').onDelete('CASCADE')
      table.enum('name', ['1', '2'])
      table.date('start')
      table.date('end')
      table.enum('active', ['1', '2'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
