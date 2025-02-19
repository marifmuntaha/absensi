import vine, {SimpleMessagesProvider} from '@vinejs/vine'

const updateSchoolValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string(),
    phone: vine.string(),
    address: vine.string(),
    email: vine.string().email(),
    type: vine.string(),
    logo: vine.string().optional(),
    image: vine.file({
      extnames: ['png'],
      size: '512kb'
    }).optional()
  })
)

updateSchoolValidator.messagesProvider = new SimpleMessagesProvider({
  'file.extname': 'Gambar harus berekstensi .png',
  'file.size': 'Ukuran gambar maksimal {{field}}'
})
export {updateSchoolValidator}
