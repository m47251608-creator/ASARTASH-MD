module.exports = {
    name: 'searchmenu',
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  🔍 𝗦𝗘𝗔𝗥𝗖𝗛 𝗧𝗢𝗟𝗦 🔍
╰━─━─━─━─━─╯
┃  ◈ .google text - Search
┃  ◈ .ytsearch text - YT Search
┃  ◈ .pinterest text - Images
┃  ◈ .wiki text - Wikipedia

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
