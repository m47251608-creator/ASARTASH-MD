const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const path = require('path');

// Welcome/Left data save karne ke liye
const dbPath = './database.json';
let db = { welcome: {}, left: {} };
if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));

function saveDB() {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

module.exports = {
    name: 'mix',
    alias: ['allmenu', 'fullmenu', 'other'],
    execute: async (sock, msg, args, { command }) => {
        const jid = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const prefix = '.';

        //.play command - YT Music Play
        if (command === 'play') {
            if (!args[0]) return sock.sendMessage(jid, { text: '❌ Song ka naam likho: `.play atif aslam`' }, { quoted: msg });

            await sock.sendMessage(jid, { text: '🔍 Searching... Thora wait kar wiro' }, { quoted: msg });
            try {
                const search = await yts(args.join(' '));
                const video = search.videos[0];
                if (!video) return sock.sendMessage(jid, { text: '❌ Song nahi mila' }, { quoted: msg });

                const stream = ytdl(video.url, { filter: 'audioonly', quality: 'highestaudio' });
                await sock.sendMessage(jid, {
                    audio: { stream },
                    mimetype: 'audio/mpeg',
                    fileName: `${video.title}.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: video.title,
                            body: video.author.name,
                            thumbnailUrl: video.thumbnail,
                            sourceUrl: video.url,
                            mediaType: 2
                        }
                    }
                }, { quoted: msg });
            } catch (e) {
                sock.sendMessage(jid, { text: '❌ Error: ' + e.message }, { quoted: msg });
            }
        }

        //.song command - MP3 Download
        else if (command === 'song') {
            if (!args[0]) return sock.sendMessage(jid, { text: '❌ `.song atif aslam`' }, { quoted: msg });
            sock.sendMessage(jid, { text: '⬇️ Downloading MP3...' }, { quoted: msg });
            // Same code as play
        }

        //.welcome on/off
        else if (command === 'welcome') {
            if (args[0] === 'on') {
                db.welcome[jid] = true;
                saveDB();
                sock.sendMessage(jid, { text: '✅ Welcome message ON kar diya' }, { quoted: msg });
            } else if (args[0] === 'off') {
                db.welcome[jid] = false;
                saveDB();
                sock.sendMessage(jid, { text: '❌ Welcome message OFF' }, { quoted: msg });
            } else {
                sock.sendMessage(jid, { text: 'Use: `.welcome on` / `.welcome off`' }, { quoted: msg });
            }
        }

        //.setwelcome
        else if (command === 'setwelcome') {
            if (!args[0]) return sock.sendMessage(jid, { text: '❌ Text likho: `.setwelcome Welcome @user to group`' }, { quoted: msg });
            db.welcome[jid + '_msg'] = args.join(' ');
            saveDB();
            sock.sendMessage(jid, { text: '✅ Welcome message set ho gaya' }, { quoted: msg });
        }

        //.left on/off
        else if (command === 'left') {
            if (args[0] === 'on') {
                db.left[jid] = true;
                saveDB();
                sock.sendMessage(jid, { text: '✅ Left message ON' }, { quoted: msg });
            } else if (args[0] === 'off') {
                db.left[jid] = false;
                saveDB();
                sock.sendMessage(jid, { text: '❌ Left message OFF' }, { quoted: msg });
            }
        }

        // 50+ Sound Effects -.sound1 to.sound50
        else if (command.startsWith('sound')) {
            const num = command.replace('sound', '');
            sock.sendMessage(jid, { text: `🔊 Sound ${num} baj raha hai...` }, { quoted: msg });
            // Yahan sound file path add karna parega: fs.createReadStream(`./sounds/${num}.mp3`)
        }

        // Mega Menu
        else if (command === 'mix' || command === 'allmenu') {
            const menu = `
╭─❀─╮
│ ✦ ASARTASH-MD MEGA MENU ✦
│ ⚡ 115+ Commands
╰─❀─╯

╭━─━─━─━─━─╮
┃ 🎵 𝗠𝗨𝗦𝗜𝗖 + 𝗣𝗟𝗔𝗬 🎵
╰━─━─━─━─━─╯
┃ ◈.play name - YT Play
┃ ◈.song name - MP3 Download
┃ ◈.video name - MP4 Download
┃ ◈.lyrics name - Lyrics
┃ ◈.pause /.resume /.skip
┃ ◈.queue /.loop /.bass
┃ ◈.nightcore /.slowed
┃ ◈.speak text - TTS
┃ ◈.sound1 to.sound50

╭━─━─━─━─━─╮
┃ 👋 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 + 𝗟𝗘𝗙𝗧 👋
╰━─━─━─━─━─╯
┃ ◈.welcome on/off
┃ ◈.setwelcome text
┃ ◈.left on/off
┃ ◈.setleft text

╭━─━─━─━─━─╮
┃ 🎮 𝗙𝗨𝗡 + 𝗧𝗢𝗟𝗦 + 𝗗𝗟 🎮
╰━─━─━─━─━─╯
┃ ◈.tictactoe.truth.dare
┃ ◈.toimage.removebg.blur
┃ ◈.ytmp3.ytmp4.tiktok
┃ ◈.google.weather.qr
┃ ◈.broadcast.ban.kick

> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩`;
            sock.sendMessage(jid, { text: menu }, { quoted: msg });
        }
    }
}
