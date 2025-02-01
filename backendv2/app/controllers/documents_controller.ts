import type { HttpContext } from '@adonisjs/core/http'

import drive from '@adonisjs/drive/services/main'
import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import app from '@adonisjs/core/services/app'
import School from '#models/school'
import Teacher from '#models/teacher'
import moment from 'moment'
import 'moment/locale/id.js'
import selfsigned from 'selfsigned'
import signpdf from '@signpdf/signpdf'
import { P12Signer } from '@signpdf/signer-p12'
import { plainAddPlaceholder } from '@signpdf/placeholder-plain'

export default class DocumentsController {
  async pdf({ request }: HttpContext) {
    const school = await School.first()
    const data = request.all()
    const value = JSON.parse(data.value)
    const teacher = await Teacher.findOrFail(data.teacherId)
    const width = 612
    const logo = await drive.use('fs').getStream('/images/logo.png')
    const signature = await drive.use('fs').getStream('/images/logo.png')

    const pdf = new PDFDocument({
      pdfVersion: '1.4',
      size: 'FOLIO',
      margin: 10,
    })
    pdf.pipe(
      fs.createWriteStream(
        app.makePath(`storage/document/${teacher?.id}-${data.month}-${data.year}.pdf`)
      )
    )

    // @ts-ignore
    pdf.image(logo?.path, 35, 15, { width: (width * 11) / 100 })

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
    const date = moment(moment(data.month + '-' + data.year, 'M-YYYY'))
      .locale('id')
      .format('MMMM YYYY')
      .toString()
    pdf.text(`REKAPITULASI BULAN ${date.toUpperCase()}`, 0, 90, {
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
    pdf.text('Jepara, 31 Januari 2025', (width * 70) / 100, highLine + 15, {
      width: (width * 40) / 100,
    })
    pdf.text('Kepala Madrasah', (width * 70) / 100, highLine + 30, {
      width: (width * 40) / 100,
    })

    // @ts-ignore
    pdf.image(signature?.path, (width * 70) / 100, highLine + 42, { width: (width * 10) / 100 })

    pdf.text('Faiz Noor, S.Pd.', (width * 70) / 100, highLine + 105, {
      width: (width * 40) / 100,
    })
    pdf
      .moveTo(40, 900)
      .lineTo(width - 40, 900)
      .stroke()
    pdf.font('Times-Italic')
    pdf.fontSize(10)
    pdf.text('Dokumen ini telah ditanda tangani secara elektronik, token : a9dwej', 45, 905, {
      width: (width * 80) / 100,
    })
    pdf.end()
  }

  async cert() {
    const attr = [
      {
        name: 'commonName',
        value: 'Muhammad Arif Muntaha',
      },
    ]
    selfsigned.generate(
      attr,
      {
        days: 365,
      },
      (_err, data) => {
        fs.writeFile(
          app.makePath('storage/cert/52/private.pem'),
          data?.private.toString(),
          (err) => {
            console.error('error', err)
          }
        )
        fs.writeFile(app.makePath('storage/cert/52/public.pem'), data?.public.toString(), (err) => {
          console.error('error', err)
        })
        fs.writeFile(app.makePath('storage/cert/52/cert.pem'), data?.cert.toString(), (err) => {
          console.error('error', err)
        })
      }
    )
    const document = await drive.use('fs').get('document/1.pdf')
    const certificate = await drive.use('fs').get('cert/52/cert.pem')
    const signer = new P12Signer(Buffer.from(certificate))
    const signedPdf = new signpdf.SignPdf()
    await signedPdf.sign(Buffer.from(document), signer)
    console.log(signedPdf)
  }

  async test() {
    const pdfBuffer = fs.readFileSync(app.makePath('storage/document/1-1-2025.pdf'))
    // certificate.p12 is the certificate that is going to be used to sign
    const certificateBuffer = fs.readFileSync(app.makePath('storage/cert/52/cert.pem'))
    const signer = new P12Signer(certificateBuffer)

    // The PDF needs to have a placeholder for a signature to be signed.
    const pdfWithPlaceholder = plainAddPlaceholder({
      pdfBuffer,
      reason: 'The user is decalaring consent.',
      contactInfo: 'signpdf@example.com',
      name: 'John Doe',
      location: 'Free Text Str., Free World',
    })

    // pdfWithPlaceholder is now a modified buffer that is ready to be signed.

    const signedPdf = new signpdf.SignPdf()
    await signedPdf.sign(pdfWithPlaceholder, signer)

    // signedPdf is a Buffer of an electronically signed PDF. Store it.
    // const targetPath = `${__dirname}/../output/typescript.pdf`
    // fs.writeFileSync(targetPath, signedPdf)
    // console.log(pdfBuffer)
  }
}
