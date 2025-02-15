import type { HttpContext } from '@adonisjs/core/http'
import Signature from '#models/signature'
import app from "@adonisjs/core/services/app";
import QRCode from "qrcode";
import {randomInt, randomUUID} from "node:crypto";
import forge from "node-forge";
import fs from "node:fs";
import drive from "@adonisjs/drive/services/main";

export default class SignaturesController {
  async index({ response }: HttpContext) {
    const signatures = await Signature.all()
    return response.status(200).json({
      result: signatures,
    })
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const params = {
        commonName: data.commonName,
        email: data.email,
        countryName: data.countryName,
        localityName: data.localityName,
        organizationName: data.organizationName,
        password: data.password,
        active: data.active,
        qrcode: '',
        cert: ''

      }
      const sug = JSON.stringify({
        name: data.commonName,
        country: data.countryName,
        locality: data.localityName,
        organization: data.organizationName
      })
      const path = app.makePath('storage/images/qrcode')
      const qrName = `${randomUUID()}.png`
      const pathName = `${path}/${qrName}`
      await QRCode.toFile(pathName, sug, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
      }).then(async () => {
        params.qrcode = qrName
      })
      const keys = forge.pki.rsa.generateKeyPair(1024)
      const cert = forge.pki.createCertificate()
      cert.publicKey = keys.publicKey
      cert.serialNumber = randomInt(2).toString()
      cert.validity.notBefore = new Date()
      cert.validity.notAfter = new Date()
      cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)
      let attrs = [
        {
          name: 'commonName',
          value: data.commonName,
        },
        {
          name: 'countryName',
          value: data.countryName,
        },
        {
          name: 'localityName',
          value: data.localityName,
        },
        {
          name: 'organizationName',
          value: data.organizationName,
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
          name: 'subjectKeyIdentifier',
        },
      ])
      cert.sign(keys.privateKey)
      let p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, cert, data.password)
      let p12Der = forge.asn1.toDer(p12Asn1).getBytes()
      let p12b64 = forge.util.encode64(p12Der)
      let certName = `${randomUUID()}.p12`
      fs.writeFileSync(app.makePath(`storage/cert/${certName}`), p12b64, 'utf-8')
      params.cert = certName
      const createSignature = await Signature.create(params)
      return response.status(201).json({
        message: 'Signature created',
        result: createSignature
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.message[0].message : error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const signature = await Signature.findOrFail(params.id)
      await drive.use('fs').delete(`images/qrcode/${signature.qrcode}`)
      await drive.use('fs').delete(`cert/${signature.cert}`)
      await signature.delete()
      return response.status(200).json({
        message: 'Signature deleted',
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.message[0].message : error,
      })
    }
  }
}
