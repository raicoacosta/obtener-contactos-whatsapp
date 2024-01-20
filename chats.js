import whatsapp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import fs from 'fs';

console.log('Iniciando script...');

const { Client, LocalAuth } = whatsapp;

const client = new Client({
  authStrategy: new LocalAuth(),
});

console.log('Iniciando cliente...');
client.on('qr', (qr) => {
  // Generate and scan this code with your phone
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', async () => {
  console.log('AUTHENTICATED');
});

client.on('ready', async () => {
  console.log('Client is ready!');
  // Listar todos los chats (incluyendo grupos)
  const allChats = await client.getChats();

  // Filtrar solo los chats
  const chats = allChats.filter(chat => !chat.isGroup);
  let allMembers = [];
  console.log('Lista de chats:');
  chats.forEach((chat) => {
    console.log(`${chat.name || 'Chat sin nombre'} - ID: ${chat.id._serialized}`);
    // Hacer un push de todos los miembros en el formato vCard usando como nombre el mismo numero de telefono mientras no empiece con el caracter +
    if (!chat.id.user.startsWith('+')) {
      allMembers.push(`BEGIN:VCARD\nVERSION:3.0\nFN:${chat.id.user}\nTEL;TYPE=CELL:${chat.id.user}\nEND:VCARD`);
    }
    const csv = allMembers.join('\n');
    fs.writeFileSync(`./chats/allUsersChats.csv`, csv);

  });
  console.log('Lista de chats finalizada');
  client.destroy();
  console.log('Script finalizado');
});

client.initialize();