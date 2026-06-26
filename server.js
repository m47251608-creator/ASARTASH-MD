const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay } = require('@whiskeysockets/baileys');
const pino = require('pino');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let latestCode = "Code yahan aayega";

app.get('/', (req, res) => {
    res.send(`
    <html>
    <head><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASARTASH-MD PAIR</title>
    <style>
        body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);font-family:'Segoe UI',sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
        .box{background:#fff;padding:30px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.2);text-align:center;width:90%;max-width:350px}
        h1{color:#764ba2;margin:0 0 10px;font-size:24px}
        input{width:100%;padding:12px;margin:10px 0;border:2px solid #ddd;border-radius:10px;font-size:16px;box-sizing:border-box}
        button{width:100%;padding:12px;background:#667eea;color:#fff;border:none;border-radius:10px;font-size:18px;font-weight:bold;cursor:pointer}
        .code-box{margin-top:20px;padding:15px;background:#f0f0f0;border-radius:10px;font-size:22px;letter-spacing:3px;font-weight:bold;color:#000}
    </style></head>
    <body>
        <div class="box">
            <h1>ASARTASH-MD 🚩</h1>
            <p>Number likho +92 ke sath</p>
            <form method="POST" action="/pair">
                <input name="number" placeholder="923424267980" required>
                <button type="submit">GET PAIR CODE</button>
            </form>
            <div class="code-box">${latestCode}</div>
        </div>
    </body></html>
    `);
});

app.post('/pair', async (req, res) => {
    const number = req.body.number.replace(/[^0-9]/g, '');
    try {
        const { state, saveCreds } = await useMultiFileAuthState(`session_${number}`);
        const sock = makeWASocket({ 
            auth: state, 
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: Browsers.ubuntu('Chrome')
        });
        
        if (!sock.authState.creds.registered) {
            await delay(1500);
            latestCode = await sock.requestPairingCode(number);
        } else {
            latestCode = "ALREADY CONNECTED ✅";
        }
        
        sock.ev.on('creds.update', saveCreds);
        setTimeout(() => sock.end(), 10000); // 10 sec baad band kar de

    } catch (e) {
        latestCode = "ERROR: Try Again";
    }
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
