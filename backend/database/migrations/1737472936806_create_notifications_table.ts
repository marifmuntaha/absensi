import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('from_user')
      table.integer('to_user')
      table.enum('type', ['1', '2']).comment('1. Perijinan, 2. Pengajuan TTD.')
      table.enum('status', ['1', '2', '3']).comment('1. Disetujui, 2. Diajukan, 3. Ditolak')
      table.string('message')
      table.enum('read', ['1', '2']).defaultTo('2')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
