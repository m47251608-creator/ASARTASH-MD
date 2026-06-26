const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const getHtml = (code = 'Enter your number first') => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ASARTASH-MD Pair</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    body { background: #0f172a; font-family: 'Poppins', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; color: #e2e8f0; }
    .card { background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(10px); padding: 35px; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); text-align: center; width: 90%; max-width: 380px; }
    h1 { font-size: 28px; font-weight: 700; margin: 0 0 5px; color: #38bdf8; }
    p { color: #94a3b8; margin-bottom: 25px; }
    input { width: 100%; padding: 14px; background: #1e293b; border: 1px solid #334155; border-radius: 12px; font-size: 16px; color: #e2e8f0; box-sizing: border-box; margin-bottom: 15px; }
    input:focus { outline: none; border-color: #38bdf8; }
    button { width: 100%; padding: 14px; background: #38bdf8; color: #0f172a; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.2s; }
    button:hover { background: #0ea5e9; }
    .code-box { margin-top: 20px; padding: 18px; background: #1e293b; border-radius: 12px; font-size: 26px; letter-spacing: 4px; font-weight: 700; color: #38bdf8; min-height: 30px; }
    .note { font-size: 12px; color: #64748b; margin-top: 15px; }
</style></head>
<body>
    <div class="card">
        <h1>ASARTASH-MD 🚩</h1>
        <p>Enter WhatsApp number with country code</p>
        <form method="POST" action="/pair">
            <input name="number" placeholder="e.g. 923424267980" required>
            <button type="submit">GENERATE PAIR CODE</button>
        </form>
        <div class="code-box">${code}</div>
        <p class="note">Go to WhatsApp > Linked Devices > Link a Device > Enter Code</p>
    </div>
</body></html>
`;

app.get('/', (req, res) => res.send(getHtml()));

app.post('/pair', async (req, res) => {
    const number = req.body.number.replace(/[^0-9]/g, '');
    let code = 'Failed. Try again in 10s';
    try {
        const sessionId = `session_${number}_${Date.now()}`;
        const { state, saveCreds } = await useMultiFileAuthState(sessionId);
        const sock = makeWASocket({ 
            auth: state, 
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: Browsers.macOS('Desktop')
        });
        
        if (!sock.authState.creds.registered) {
            await delay(2000);
            code = await sock.requestPairingCode(number);
        } else {
            code = 'ALREADY PAIRED';
        }
        await delay(1000);
        sock.end();
        fs.rmSync(sessionId, { recursive: true, force: true }); // Session delete kar do

    } catch (e) {
        console.log(e);
        code = 'ERROR. Retry';
    }
    res.send(getHtml(code));
});

app.listen(PORT);
