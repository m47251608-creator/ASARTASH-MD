module.exports = {
    name: 'islamic',
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  🕌 𝗜𝗦𝗟𝗔𝗠𝗜𝗖 𝗧𝗢𝗟𝗦 🕌
╰━─━─━─━─━─╯
┃  ◈ .quran - Quran Ayat
┃  ◈ .hadith - Hadith
┃  ◈ .dua - Rozana Dua
┃  ◈ .namaz - Namaz Time
┃  ◈ .99names - Allah ke naam

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
