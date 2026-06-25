module.exports = {
    name: 'funmenu',
    alias: ['fun'],
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  😂 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 😂
╰━─━─━─━─━─╯
┃  ◈ .joke - Lata
┃  ◈ .fact - Ajeeb Fact
┃  ◈ .flirt - Flirt line
┃  ◈ .rate - Rating do
┃  ◈ .ship @tag - Love %

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
