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
  const chats = await client.getChats();

  // Filtrar solo los grupos
  const groups = chats.filter(chat => chat.isGroup);
  let allMembers = [];
  console.log('Lista de grupos:');
  groups.forEach((group) => {
    console.log(`${group.name || 'Grupo sin nombre'} - ID: ${group.id._serialized}`);
    // Obtener los miembros del grupo
    const members = group.participants;
    console.log('Lista de members:');
    members.forEach((member) => {
      console.log(`${member.name || 'Miembro sin nombre'} - ID: ${member.id._serialized}`);
      // Hacer un push de todos los miembros en el formato vCard usando como nombre el mismo numero de telefono
      allMembers.push(`BEGIN:VCARD\nVERSION:3.0\nFN:${member.id.user}\nTEL;TYPE=CELL:${member.id.user}\nEND:VCARD`);
    });
    const csv = allMembers.join('\n');
    // Guardar la lista de miembros en un archivo CSV escapando los caracteres especiales

    fs.writeFileSync(`./groups/${group.name.replace(/[^\w\s]/gi, '')}.csv`, csv);
  });

  console.log('Lista de grupos finalizada');
  client.destroy();
  console.log('Script finalizado');
});

client.initialize();
