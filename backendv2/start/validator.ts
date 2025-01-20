import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  required: 'Kolom {{field}} tidak boleh kosong.',
  string: 'Kolom {{field}} harus bertipe String.',
  email: 'Alamat Email tidak valid.',
})
