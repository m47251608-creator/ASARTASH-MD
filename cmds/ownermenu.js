module.exports = {
    name: 'ownermenu',
    alias: ['owner'],
    execute: async (sock, msg) => {
        const text = `
╭━─━─━─━─━─╮
┃  👑 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 👑
╰━─━─━─━─━─╯
┃  ◈ .broadcast - Sab ko msg
┃  ◈ .ban @user - Ban karo
┃  ◈ .unban @user - Unban
┃  ◈ .join link - Group join
┃  ◈ .leave - Group leave

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
        await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
}
