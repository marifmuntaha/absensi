import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schools'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('email').nullable()
      table
        .enum('type', ['1', '2', '3'])
        .comment('1. Scan Operator, 2. Scan Guru, 3. Manual Guru')
        .nullable()
      table.string('logo').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
