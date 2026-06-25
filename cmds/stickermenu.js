module.exports = {
    name: 'stickermenu',
    alias: ['sticker'],
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  📸 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 𝗠𝗘𝗡𝗨 📸
╰━─━─━─━─━─╯
┃  ◈ .s - Image ko sticker
┃  ◈ .stext text - Text sticker
┃  ◈ .take name - Sticker pack
┃  ◈ .tgs - Telegram sticker

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
