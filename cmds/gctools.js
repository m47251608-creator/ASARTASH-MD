module.exports = {
    name: 'gctools',
    alias: ['gc'],
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  👥 𝗚𝗥𝗢𝗨𝗣 𝗧𝗢𝗟𝗦 👥
╰━─━─━─━─━─╯
┃  ◈ .add 92xxx - Add karo
┃  ◈ .kick @tag - Nikalo  
┃  ◈ .promote @tag - Admin
┃  ◈ .demote @tag - Remove admin
┃  ◈ .gclink - Group link
┃  ◈ .gcmute - Group lock
┃  ◈ .gcunmute - Group open

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
