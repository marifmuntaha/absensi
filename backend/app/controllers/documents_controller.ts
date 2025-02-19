import type {HttpContext} from '@adonisjs/core/http'

import drive from '@adonisjs/drive/services/main'
import PDFDocument from 'pdfkit'
import app from '@adonisjs/core/services/app'
import School from '#models/school'
import Teacher from '#models/teacher'
import moment from 'moment'
import 'moment/locale/id.js'
import User from '#models/user'
import {P12Signer} from '@signpdf/signer-p12'
import * as fs from 'node:fs'
import {plainAddPlaceholder} from '@signpdf/placeholder-plain'
import {SignPdf} from '@signpdf/signpdf'
import Signature from "#models/signature";

export default class DocumentsController {
  async create({request, response}: HttpContext) {
    try {
      const school = await School.first()
      const data = request.all()
      const value = JSON.parse(data.value)
      const teacher = await Teacher.findOrFail(data.teacherId)
      const head = await User.query().where('role', '2').first()
      const signature = await Signature.query().where('active', '1').first()
      const width = 612
      const logo = await drive.use('fs').getStream('/images/logo.png')
      const qrcode = await drive.use('fs').getStream(`/images/qrcode/${signature ? signature.qrcode : ''}`)
      const signatureLogo = await drive.use('fs').getStream('/images/signature2.png')
      const monthYear = moment(data.date).locale('id').format('MMMM-YYYY').toString()
      const lastDate = moment(data.date)
        .locale('id')
        .endOf('months')
        .format('DD MMMM YYYY')
        .toString()

      const pdf = new PDFDocument({
        pdfVersion: '1.4',
        size: 'FOLIO',
        margin: 10,
      })
      const stream = fs.createWriteStream(app.makePath(`storage/document/${teacher?.id}-${monthYear}.pdf`))
      pdf.pipe(stream)
      // @ts-ignore
      pdf.image(logo.path, 35, 15, {width: (width * 11) / 100})
      pdf.font('Times-Bold')
      pdf.fontSize(16)
      pdf.text('SISTEM ABSENSI ONLINE', 0, 20, {
        width: width,
        align: 'center',
      })
      pdf.text('MADRASAH ALIYAH', 0, 35, {
        width: width,
        align: 'center',
      })
      // @ts-ignore
      pdf.text(school.name, 0, 50, {
        width: width,
        align: 'center',
      })

      pdf.font('Times-Italic')
      pdf.fontSize(10)
      // @ts-ignore
      pdf.text(school.address, 0, 65, {
        width: width,
        align: 'center',
      })
      pdf
        .moveTo(35, 85)
        .lineTo(width - 35, 85)
        .stroke()

      pdf.font('Times-Bold')
      pdf.fontSize(11)
      pdf.text(`REKAPITULASI BULAN ${monthYear.toUpperCase()}`, 0, 90, {
        width: width,
        align: 'center',
      })

      pdf.font('Times-Roman')
      pdf.fontSize(12)
      pdf.text('Nama', 40, 110, {
        width: (width * 15) / 100,
      })
      pdf.text(`: ${teacher.name}`, (width * 15) / 100, 110, {
        width: width - (width * 15) / 100,
      })

      pdf.text('NIP', 40, 125, {
        width: (width * 15) / 100,
      })
      pdf.text(`: ${teacher.nip}`, (width * 15) / 100, 125, {
        width: width - (width * 15) / 100,
      })
      pdf.text('NUPTK', 40, 140, {
        width: (width * 15) / 100,
      })
      pdf.text(`: ${teacher.nuptk}`, (width * 15) / 100, 140, {
        width: width - (width * 15) / 100,
      })

      pdf
        .moveTo(40, 160)
        .lineTo(width - 40, 160)
        .stroke()
      pdf.text('Tanggal', 50, 165, {
        width: (width * 10) / 100,
      })
      pdf.text('Masuk', (width * 20) / 100, 165, {
        width: (width * 15) / 100,
      })
      pdf.text('Keluar', (width * 35) / 100, 165, {
        width: (width * 15) / 100,
      })
      pdf.text('Status', (width * 50) / 100, 165, {
        width: (width * 10) / 100,
      })
      pdf.text('Keterangan', (width * 60) / 100, 165, {
        width: (width * 40) / 100,
      })
      const highRange = 18
      let highText = 185
      let highLine = 180
      let day = 1
      pdf.fontSize(11)
      value?.presences?.map(
        (item: { in: string; out: string; statusIn: string; description: string }) => {
          pdf.text(String(day), 50, highText, {
            width: (width * 10) / 100,
          })
          pdf.text(item.in, (width * 20) / 100, highText, {
            width: (width * 15) / 100,
          })
          pdf.text(item.out, (width * 35) / 100, highText, {
            width: (width * 15) / 100,
          })
          pdf.text(item.statusIn, (width * 50) / 100, highText, {
            width: (width * 10) / 100,
          })
          pdf.text(item.description, (width * 60) / 100, highText, {
            width: (width * 40) / 100,
          })
          pdf
            .moveTo(40, highLine)
            .lineTo(width - 40, highLine)
            .stroke()
          highLine = highLine + highRange
          highText = highText + highRange
          day++
        }
      )

      pdf
        .moveTo(40, highLine)
        .lineTo(width - 40, highLine)
        .stroke()
      pdf.text(`Jepara, ${lastDate}`, (width * 70) / 100, highLine + 15, {
        width: (width * 40) / 100,
      })
      pdf.text('Kepala Madrasah', (width * 70) / 100, highLine + 30, {
        width: (width * 40) / 100,
      })

      // @ts-ignore
      pdf.image(qrcode?.path, (width * 70) / 100, highLine + 42, {width: (width * 10) / 100})

      // @ts-ignore
      pdf.text(head?.name, (width * 70) / 100, highLine + 105, {
        width: (width * 40) / 100,
      })
      pdf
        .moveTo(40, 895)
        .lineTo(width - 40, 895)
        .stroke()
      // @ts-ignore
      pdf.image(signatureLogo?.path, 50, 902, {width: (width * 4) / 100})
      pdf.font('Times-Italic')
      pdf.fontSize(10)
      pdf.text(
        `Dokumen ini telah ditanda tangani secara elektronik.`,
        78,
        905,
        {
          width: (width * 80) / 100,
        }
      )
      pdf.text(
        `Token : ${data.number}`,
        78,
        915,
        {
          width: (width * 80) / 100,
        }
      )
      pdf.save()
      pdf.end()
      return response.status(200).json({
        result: {
          path: `storage/document/${teacher?.id}-${monthYear}.pdf`,
          pathSigned: `storage/document/${teacher?.id}-${monthYear}-signed.pdf`
        }
      })
    } catch (err) {
      return response.status(400).json({
        message: err.messages ? err.messages[0].message : err.message,
      })
    }
  }

  async signed({request, response}: HttpContext) {
    try {
      const signature = await Signature.query().where('active', '1').first()
      const data = request.all()
      const pdfBuffer = fs.readFileSync(app.makePath(data.path))
      const certificateBuffer = fs.readFileSync(app.makePath(`storage/cert/${signature && signature.cert}`), 'utf-8')
      const signer = new P12Signer(certificateBuffer, {passphrase: 'password'})
      const pdfWithPlaceholder = plainAddPlaceholder({
        pdfBuffer,
        reason: 'Digital Signature',
        contactInfo: signature ? signature.email : '',
        name: signature ? signature.commonName : '',
        location: signature ? signature.countryName : '',
        signingTime: new Date(),
      })
      const signed = new SignPdf()
      const signedPdf = await signed.sign(pdfWithPlaceholder, signer)
      const targetPath = app.makePath(data.pathSigned)
      fs.writeFileSync(targetPath, signedPdf)
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
