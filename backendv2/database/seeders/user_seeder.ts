import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'Muhammad Arif Muntaha',
        username: 'marifmuntaha',
        password: 'myu2nnmd',
        email: 'marifmuntaha@mail.com',
        role: '1',
      },
    ])
  }
}
