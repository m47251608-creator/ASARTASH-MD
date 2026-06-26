const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #0f172a, #000);
          font-family: 'Poppins', sans-serif;
          color: #fff;
          overflow: hidden;
        }
        .card {
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid #38bdf8;
          box-shadow: 0 0 30px #38bdf8, inset 0 0 20px rgba(56,189,248,0.2);
          border-radius: 25px;
          padding: 40px 30px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: glow 2s infinite alternate;
        }
        @keyframes glow {
          from { box-shadow: 0 0 20px #38bdf8; }
          to { box-shadow: 0 0 40px #f472b6; }
        }
        h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.2rem;
          color: #38bdf8;
          margin-bottom: 5px;
          text-shadow: 0 0 10px #38bdf8;
        }
        .tag { color: #f472b6; font-size: 0.9rem; margin-bottom: 20px; }
        .code-box {
          background: #0f172a;
          border: 1px solid #f472b6;
          border-radius: 15px;
          padding: 15px;
          font-size: 1.5rem;
          letter-spacing: 3px;
          color: #fff;
          box-shadow: inset 0 0 10px #f472b6;
        }
        .footer { margin-top: 20px; font-size: 0.8rem; color: #94a3b8; }
        .emoji { font-size: 2rem; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">🍒🐉🔖</div>
        <h1>ASARTASH-MD</h1>
        <div class="tag">Powered by @Asad-TechX | Owner: +923424267980</div>
        <div class="code-box" id="code">LOADING...</div>
        <div class="footer">Open WhatsApp > Link Device > Enter Code Above</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => console.log('ASARTASH-MD running on '+port));
