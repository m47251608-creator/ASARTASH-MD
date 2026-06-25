const express = require('express')
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs-extra')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Beautiful Pair Code Web
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ASARTASH-MD Pair Code</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{
      background:linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 100%);
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      color:#fff
    }
    .box{
      background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,0.1);border-radius:20px;
      padding:40px 30px;width:90%;max-width:400px;
      box-shadow:0 20px 60px rgba(0,0,0,0.5)
    }
    h1{text-align:center;margin-bottom:10px;font-size:28px}
    .powered{text-align:center;font-size:12px;color:#888;margin-bottom:30px}
    input{
      width:100%;padding:15px;border-radius:12px;border:1px solid #333;
      background:#1a1a1a;color:#fff;font-size:16px;outline:none;margin-bottom:15px
    }
    input:focus{border-color:#25D366}
    button{
      width:100%;padding:15px;border-radius:12px;border:none;
      background:linear-gradient(135deg,#25D366 0%,#128C7E 100%);
      color:#fff;font-size:16px;font-weight:bold;cursor:pointer;
      transition:0.3s
    }
    button:hover{transform:translateY(-2px);box-shadow:0 10px 20px rgba(37,211,102,0.3)}
    .note{margin-top:20px;font-size:12px;color:#666;text-align:center}
  </style>
</head>
<body>
  <div class="box">
    <h1>🔐 ASARTASH-MD</h1>
    <div class="powered">Powered by @Asad-TechX</div>
    <form method="POST" action="/pair">
      <input type="text" name="number" placeholder="9234XXXXXXXXX" required>
      <button type="submit">Get Pair Code</button>
    </form>
    <div class="note">Country code k sath number likho. Bina + ke</div>
  </div>
</body>
</html>
  `)
})

// Pairing Code API
app.post('/pair', async (req, res) => {
  const number = req.body.number.replace(/[^0-9]/g, '')
  
  if(!number) return res.send('Number likho wiro!')

  try {
    const { state, saveCreds } = await useMultiFileAuthState('./auth')
    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: 'silent' }),
      browser: Browsers.ubuntu('Chrome')
    })

    await delay(2000)
    let code = await sock.requestPairingCode(number)
    code = code.match(/.{1,4}/g).join('-')
    
    res.send(`
      <div style="background:#0f0f0f;color:#fff;height:100vh;display:flex;align-items:center;justify-content:center;font-family:Segoe UI">
        <div style="text-align:center">
          <h1>✅ Pair Code Ready</h1>
          <h2 style="font-size:40px;margin:30px 0;color:#25D366">${code}</h2>
          <p>WhatsApp > Linked Devices > Link a Device > Link with phone number</p>
          <p style="color:#888;margin-top:20px">Code 20 sec mein expire ho jayega</p>
        </div>
      </div>
    `)
    
    sock.ev.on('creds.update', saveCreds)
  } catch(e) {
    res.send('Error: ' + e.message)
  }
})

app.listen(port, () => console.log(`Web chal gaya port ${port}`))
