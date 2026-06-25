const express = require('express');
const { makeWASocket, useMultiFileAuthState, Browsers } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const app = express();
app.use(express.json());

app.get('/pair', async (req, res) => {
    const number = req.query.number;
    if (!number) return res.send('Number do ?number=9234xxxxxxx');

    const { state, saveCreds } = await useMultiFileAuthState(`./temp_${number}`);
    const sock = makeWASocket({ auth: state, browser: Browsers.macOS('Safari') });
    sock.ev.on('creds.update', saveCreds);

    let code = await sock.requestPairingCode(number);
    code = code?.match(/.{1,4}/g)?.join('-') || code;
    
    res.send(`
    <h1>ASARTASH-MD Pair Code</h1>
    <h2>Code: ${code}</h2>
    <p>WhatsApp > Linked Devices > Link with phone number code > Code paste karo</p>
    <p>Powered by @Asad-TechX 🚩</p>
    `);
});

module.exports = app;
