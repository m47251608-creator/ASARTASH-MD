const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const getHtml = (code = 'ENTER NUMBER TO START') => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ASARTASH-MD</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@600&display=swap');
    body { background: #0a0a0a; font-family: 'Rajdhani', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; color: #ff1a1a; }
    .card { background: #111; border: 2px solid #ff1a1a; padding: 35px; border-radius: 16px; box-shadow: 0 0 25px rgba(255, 26, 26, 0.4); text-align: center; width: 90%; max-width: 380px; }
    h1 { font-family: 'Orbitron', sans-serif; font-size: 32px; font-weight: 900; margin: 0 0 5px; color: #ff1a1a; text-shadow: 0 0 10px #ff1a1a; }
    p { color: #aaa; margin-bottom: 25px; font-weight: 600; }
    input { width: 100%; padding: 14px; background: #000; border: 1px solid #ff1a1a; border-radius: 8px; font-size: 16px; color: #ff1a1a; box-sizing: border-box; margin-bottom: 15px; font-family: 'Rajdhani', sans-serif; }
    input:focus { outline: none; box-shadow: 0 0 8px #ff1a1a; }
    button { width: 100%; padding: 14px; background: #ff1a1a; color: #000; border: none; border-radius: 8px; font-size: 18px; font-weight: 900; font-family: 'Orbitron', sans-serif; cursor: pointer; transition: 0.2s; }
    button:hover { background: #ff3333; box-shadow: 0 0 15px #ff1a1a; }
    .code-box { margin-top: 20px; padding: 18px; background: #000; border: 1px dashed #ff1a1a; border-radius: 8px; font-size: 24px; letter-spacing: 3px; font-weight: 700; color: #ff1a1a; min-height: 30px; font-family: 'Orbitron', sans-serif; }
    .note { font-size: 12px; color: #666; margin-top: 15px; }
    footer { margin-top: 25px; font-size: 14px; color: #ff1a1a; font-weight: 700; }
</style></head>
<body>
    <div class="card">
        <h1>ASARTASH-MD 🚩</h1>
        <p>ENTER WHATSAPP NUMBER WITH COUNTRY CODE</p>
        <form method="POST" action="/pair">
            <input name="number" placeholder="e.g. 923424267980" required>
            <button type="submit">GET PAIR CODE</button>
        </form>
        <div class="code-box">${code}</div>
        <p class="note">WHATSAPP > LINKED DEVICES > LINK A DEVICE > ENTER CODE</p>
        <footer>@Powered by 𝐀͠ѕꪲʌ̄ძ 🚩</footer>
    </div>
</body></html>
`;

app.get('/', (req, res) => res.send(getHtml()));

app.post('/pair', async (req, res) => {
    const number = req.body.number.replace(/[^0-9]/g, '');
    let code = 'FAILED. RETRY';
    try {
        const sessionId = `sess_${number}_${Date.now()}`;
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
        fs.rmSync(sessionId, { recursive: true, force: true });

    } catch (e) {
        console.log(e);
        code = 'ERROR. RETRY';
    }
    res.send(getHtml(code));
});

app.listen(PORT);
