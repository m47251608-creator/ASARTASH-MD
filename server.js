const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function startBot(number) {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const sock = makeWASocket({
        auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino()) },
        printQRInTerminal: false,
        logger: pino({ level: 'fatal' }),
        browser: Browsers.ubuntu('Chrome')
    });
    sock.ev.on('creds.update', saveCreds);
    
    if (!sock.authState.creds.registered) {
        await delay(1500);
        number = number.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(number);
        return code;
    }
    return null;
}

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ASARTASH-MD Pair 🐉</title>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Poppins&display=swap" rel="stylesheet">
      <style>
        body {margin: 0;height: 100vh;display: flex;align-items: center;justify-content: center;background: radial-gradient(circle at top, #0f172a, #000);font-family: 'Poppins', sans-serif;color: #fff;overflow: hidden;}
        .card {background: rgba(15, 23, 42, 0.8);border: 2px solid #38bdf8;box-shadow: 0 0 30px #38bdf8, inset 0 0 20px rgba(56,189,248,0.2);border-radius: 25px;padding: 40px 30px;text-align: center;backdrop-filter: blur(10px);animation: glow 2s infinite alternate;width: 90%;max-width: 400px;}
        @keyframes glow {from { box-shadow: 0 0 20px #38bdf8; }to { box-shadow: 0 0 40px #f472b6; }}
        h1 {font-family: 'Orbitron', sans-serif;font-size: 2.2rem;color: #38bdf8;margin-bottom: 5px;text-shadow: 0 0 10px #38bdf8;}
        .tag { color: #f472b6; font-size: 0.9rem; margin-bottom: 20px; }
        input {width: 100%;padding: 12px;background: #0f172a;border: 1px solid #38bdf8;border-radius: 10px;color: #fff;font-size: 1rem;text-align: center;outline: none;}
        button {width: 100%;padding: 12px;margin-top: 15px;background: #38bdf8;border: none;border-radius: 10px;color: #000;font-weight: bold;font-size: 1rem;cursor: pointer;transition: 0.3s;}
        button:hover {background: #f472b6;}
        .code-box {background: #0f172a;border: 1px solid #f472b6;border-radius: 15px;padding: 15px;font-size: 1.8rem;letter-spacing: 5px;color: #fff;box-shadow: inset 0 0 10px #f472b6;margin-top: 15px;}
        .footer { margin-top: 20px; font-size: 0.8rem; color: #94a3b8; }
        .emoji { font-size: 2rem; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">🍒🐉🔖</div>
        <h1>ASARTASH-MD</h1>
        <div class="tag">Powered by @Asad-TechX | Owner: +923424267980</div>
        <form method="POST" action="/pair">
          <input type="text" name="number" placeholder="9234XXXXXXXX" required>
          <button type="submit">GET PAIR CODE</button>
        </form>
        ${req.query.code ? `<div class="code-box">${req.query.code}</div><div class="footer">WhatsApp > Link Device > Enter This Code</div>` : ''}
      </div>
    </body>
    </html>
  `);
});

app.post('/pair', async (req, res) => {
    const number = req.body.number;
    if (!number) return res.redirect('/');
    try {
        const code = await startBot(number);
        res.redirect(`/?code=${code}`);
    } catch (e) {
        res.redirect('/?code=ERROR');
    }
});

app.listen(port, () => console.log('ASARTASH-MD running on '+port));
