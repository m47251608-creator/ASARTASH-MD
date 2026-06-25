module.exports = {
    name: 'aimenu',
    alias: ['ai'],
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  🤖 𝗔𝗜 𝗠𝗘𝗡𝗨 🤖
╰━─━─━─━─━─╯
┃  ◈ .ai sawal - ChatGPT
┃  ◈ .imagine text - AI Image
┃  ◈ .bard - Google AI
┃  ◈ .translate text - Tarjuma

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
