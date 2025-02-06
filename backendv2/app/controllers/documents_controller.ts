import type { HttpContext } from '@adonisjs/core/http'

import drive from '@adonisjs/drive/services/main'
import PDFDocument from 'pdfkit'
import app from '@adonisjs/core/services/app'
import School from '#models/school'
import Teacher from '#models/teacher'
import moment from 'moment'
import 'moment/locale/id.js'
import User from '#models/user'
import forge from 'node-forge'
import { P12Signer } from '@signpdf/signer-p12'
import * as fs from 'node:fs'
import { plainAddPlaceholder } from '@signpdf/placeholder-plain'
import { SignPdf } from '@signpdf/signpdf'

export default class DocumentsController {
  async pdf({ request }: HttpContext) {
    const school = await School.first()
    const data = request.all()
    const value = JSON.parse(data.value)
    const teacher = await Teacher.findOrFail(data.teacherId)
    const head = await User.query().where('role', '2').first()
    const width = 612
    const logo = await drive.use('fs').getStream('/images/logo.png')
    const signature = await drive.use('fs').getStream('/images/logo.png')
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
    pdf.pipe(fs.createWriteStream(app.makePath(`storage/document/${teacher?.id}-${monthYear}.pdf`)))

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
    pdf.image(signature?.path, (width * 70) / 100, highLine + 42, { width: (width * 10) / 100 })

    // @ts-ignore
    pdf.text(head?.name, (width * 70) / 100, highLine + 105, {
      width: (width * 40) / 100,
    })
    pdf
      .moveTo(40, 900)
      .lineTo(width - 40, 900)
      .stroke()
    pdf.font('Times-Italic')
    pdf.fontSize(10)
    pdf.text(
      `Dokumen ini telah ditanda tangani secara elektronik, token : ${data.number}`,
      45,
      905,
      {
        width: (width * 80) / 100,
      }
    )
    pdf.end()
  }

  async verify() {
    const filePdf = await drive.use('fs').getStream('/document/1-Januari-2025.pdf')
    const fileCert = await drive.use('fs').getStream('/cert/signed.p12')
    const pdfBuffer = fs.readFileSync(filePdf?.path)
    const certificateBuffer = fs.readFileSync(fileCert?.path)
    const signer = new P12Signer(certificateBuffer, { passphrase: 'password' })
    const pdfWithPlaceholder = plainAddPlaceholder({
      pdfBuffer,
      reason: 'asd',
      contactInfo: 'asd',
      name: 'asd',
      location: 'asd',
    })
    const signed = new SignPdf()
    const signedPdf = await signed.sign(pdfWithPlaceholder, signer)
    const targetPath = app.makePath('storage/document/1-Januari-2025-signed.pdf')
    fs.writeFileSync(targetPath, signedPdf)
  }

  async certificate() {
    let keys = forge.pki.rsa.generateKeyPair(2048)
    let cert = forge.pki.createCertificationRequest()
    cert.publicKey = keys.publicKey
    cert.serialNumber = '01'
    cert.validity.notBefore = new Date()
    cert.validity.notAfter = new Date()
    cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)
    const attrs = [
      {
        name: 'commonName',
        value: 'Sholihin, S.Ag.',
      },
      {
        name: 'countryName',
        value: 'ID',
      },
      {
        shortName: 'ST',
        value: 'Jawa Tengah',
      },
      {
        name: 'localityName',
        value: 'Indonesia',
      },
      {
        name: 'organizationName',
        value: 'MTs. Darul Hikmah Menganti',
      },
      {
        shortName: 'OU',
        value: 'Test',
      },
    ]
    cert.setSubject(attrs)
    cert.setIssuer(attrs)
    cert.setExtensions([
      {
        name: 'basicConstraints',
        cA: true,
      },
      {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true,
      },
      {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        emailProtection: true,
        timeStamping: true,
      },
      {
        name: 'nsCertType',
        client: true,
        server: true,
        email: true,
        objsign: true,
        sslCA: true,
        emailCA: true,
        objCA: true,
      },
      {
        name: 'subjectAltName',
        altNames: [
          {
            type: 6, // URI
            value: 'http://example.org/webid#me',
          },
          {
            type: 7, // IP
            ip: '127.0.0.1',
          },
        ],
      },
      {
        name: 'subjectKeyIdentifier',
      },
    ])
    cert.sign(keys.privateKey)
    let testing = forge.pki.certificationRequestToAsn1(cert)
    let p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, testing, 'password')
    let p12Der = forge.asn1.toDer(p12Asn1).getBytes()
    let testing1 = forge.asn1.fromDer(p12Der)
    let testing2 = forge.pkcs12.pkcs12FromAsn1(testing1, 'password')
    // await drive.use('fs').put('cert/signed.p12', p12Der.toString())
  }
}
