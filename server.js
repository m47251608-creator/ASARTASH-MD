const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const getHtml = (code = 'AWAITING INPUT...') => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ASARTASH-MD</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700;900&family=Share+Tech+Mono&display=swap');
    :root { --neon: #00f5ff; --dark: #050a14; }
    body { background: var(--dark); background-image: radial-gradient(circle, #0a1a2f 0%, #050a14 100%); font-family: 'Share Tech Mono', monospace; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; color: var(--neon); overflow: hidden; }
    .card { background: rgba(5, 10, 20, 0.8); border: 1px solid var(--neon); padding: 35px; border-radius: 12px; box-shadow: 0 0 30px var(--neon), inset 0 0 15px rgba(0, 245, 255, 0.1); text-align: center; width: 90%; max-width: 400px; backdrop-filter: blur(5px); animation: flicker 2s infinite; }
    @keyframes flicker { 0%, 100% { box-shadow: 0 0 30px var(--neon); } 50% { box-shadow: 0 0 40px var(--neon); } }
    h1 { font-family: 'Exo 2', sans-serif; font-size: 36px; font-weight: 900; margin: 0 0 10px; color: var(--neon); text-shadow: 0 0 5px var(--neon), 0 0 20px var(--neon); }
    p { color: #8affff; margin-bottom: 25px; font-size: 14px; }
    input { width: 100%; padding: 14px; background: #000; border: 1px solid var(--neon); border-radius: 6px; font-size: 16px; color: var(--neon); box-sizing: border-box; margin-bottom: 15px; font-family: 'Share Tech Mono', monospace; }
    input:focus { outline: none; box-shadow: 0 0 15px var(--neon); }
    button { width: 100%; padding: 14px; background: transparent; color: var(--neon); border: 2px solid var(--neon); border-radius: 6px; font-size: 18px; font-weight: 900; font-family: 'Exo 2', sans-serif; cursor: pointer; transition: 0.3s; }
    button:hover { background: var(--neon); color: var(--dark); box-shadow: 0 0 20px var(--neon); }
    .code-box { margin-top: 20px; padding: 20px; background: #000; border: 1px solid var(--neon); border-radius: 6px; font-size: 28px; letter-spacing: 5px; font-weight: 700; color: var(--neon); min-height: 35px; font-family: 'Exo 2', sans-serif; text-shadow: 0 0 10px var(--neon); }
    .note { font-size: 11px; color: #5affff; margin-top: 15px; opacity: 0.7; }
    footer { margin-top: 20px; font-size: 16px; color: var(--neon); font-weight: 700; text-shadow: 0 0 8px var(--neon); }
</style></head>
<body>
    <div class="card">
        <h1>ASARTASH-MD 🚩</h1>
        <p>[ SYSTEM ONLINE ] ENTER NUMBER WITH CC</p>
        <form method="POST" action="/pair">
            <input name="number" placeholder="923424267980" required>
            <button type="submit">> GENERATE CODE</button>
        </form>
        <div class="code-box">${code}</div>
        <p class="note">> WHATSAPP > LINKED DEVICES > ENTER CODE</p>
        <footer>@Powered by 𝐀ѕꪲʌ̄ძ 🚩</footer>
    </div>
</body></html>
`;

app.get('/', (req, res) => res.send(getHtml()));

app.post('/pair', async (req, res) => {
    const number = req.body.number.replace(/[^0-9]/g, '');
    let code = 'SYSTEM ERROR. RETRY';
    try {
        const sessionId = `s_${number}_${Date.now()}`;
        const { state } = await useMultiFileAuthState(sessionId);
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
        sock.end();
        fs.rmSync(sessionId, { recursive: true, force: true });

    } catch (e) {
        code = 'SYSTEM ERROR. RETRY';
    }
    res.send(getHtml(code));
});

app.listen(PORT);
