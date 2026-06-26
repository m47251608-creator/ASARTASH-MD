const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay } = require('@whiskeysockets/baileys');
const pino = require('pino');
const app = express();
const PORT = process.env.PORT || 3000;

let pairCode = "Loading...";
let isConnected = false;

app.get('/', async (req, res) => {
    res.send(`
        <html><body style="background:#000;color:#0f0;font-family:monospace;text-align:center;padding-top:50px">
        <h1>ASARTASH-MD PAIR SITE 🚩</h1>
        <h2>PAIR CODE: ${pairCode}</h2>
        <p>WhatsApp > Linked Devices > Link a Device > Enter Code</p>
        ${isConnected ? '<h3 style="color:lime">CONNECTED ✅</h3>' : ''}
        </body></html>
    `);
});

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const sock = makeWASocket({ 
        auth: state, 
        printQRInTerminal: false, // IMPORTANT: Terminal pe nahi dikhana
        logger: pino({ level: 'silent' }),
        browser: Browsers.ubuntu('Chrome')
    });

    if (!sock.authState.creds.registered) {
        await delay(1500);
        const number = process.env.NUMBER; // NUMBER env var mein dalna padega
        if(number) {
            pairCode = await sock.requestPairingCode(number);
        }
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            isConnected = true;
            pairCode = "CONNECTED ✅";
            console.log('Bot Connected');
        }
    });
}

app.listen(PORT, () => startBot());
