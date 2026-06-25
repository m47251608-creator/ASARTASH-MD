const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const config = require('./config');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('ASARTASH-MD BOT RUNNING 🚩 Powered by @Asad-TechX'));

app.listen(PORT, () => console.log(`Server chal raha port ${PORT} pe`));

// 800+ Commands ka system
const commands = new Map();

// Command load karne ka function
fs.readdirSync('./cmds').forEach(file => {
    if(file.endsWith('.js')) {
        const cmd = require(`./commands/${file}`);
        commands.set(cmd.name, cmd);
        if(cmd.alias) cmd.alias.forEach(a => commands.set(a, cmd));
    }
});

// Baileys connection
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ['ASARTASH-MD', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode!== DisconnectReason.loggedOut;
            if(shouldReconnect) startBot();
        }
        console.log('Connection:', connection);
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if(!msg.message || msg.key.fromMe) return;

        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        if(!body.startsWith(config.prefix)) return;

        const args = body.slice(config.prefix.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();

        const cmd = commands.get(cmdName);
        if(cmd) {
            try {
                await cmd.execute(sock, msg, args);
            } catch(e) {
                console.log(e);
            }
        }
    });

    console.log('ASARTASH-MD Connected! Powered by @Asad-TechX 🚩');
}

startBot();
