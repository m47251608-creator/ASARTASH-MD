module.exports = {
    name: 'dlmenu',
    alias: ['dl'],
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  ⬇️ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ⬇️
╰━─━─━─━─━─╯
┃  ◈ .yt link - Youtube Video
┃  ◈ .song link - MP3
┃  ◈ .tiktok link - Tiktok
┃  ◈ .fb link - Facebook
┃  ◈ .insta link - Instagram

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
