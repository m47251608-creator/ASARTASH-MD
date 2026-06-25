module.exports = {
    name: 'editmenu',
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  🎨 𝗣𝗛𝗢𝗧𝗢 𝗘𝗗𝗜𝗧 🎨
╰━─━─━─━─━─╯
┃  ◈ .blur - Image blur
┃  ◈ .bright - Brightness
┃  ◈ .remove - BG remove
┃  ◈ .pixel - Pixelate
┃  ◈ .cartoon - Cartoon effect

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
