import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import fs from "node:fs";

export default class Setup extends BaseCommand {
  static commandName = 'setup'
  static description = 'Setup App for first time'

  static options: CommandOptions = {
    startApp: false,
    staysAlive: false,
  }

  async run() {
    this.logger.info('copy Environment Development.')
    fs.copyFile('.env.example', '.env', (err) => {
      if (err) throw err
      this.logger.success('copy Environment Development')
    })
    this.logger.info('Created storage folder.')
    fs.mkdirSync('storage', { recursive: true })
    fs.mkdirSync('storage/images', { recursive: true })
    fs.mkdirSync('storage/images/qrcode', { recursive: true })
    fs.mkdirSync('storage/images/teacher', { recursive: true })
    fs.mkdirSync('storage/cert', { recursive: true })
    fs.mkdirSync('storage/document', { recursive: true })
    this.logger.success('Created storage folder.')
  }
}
