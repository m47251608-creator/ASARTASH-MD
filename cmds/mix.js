module.exports = {
    name: 'mix',
    alias: ['allmenu', 'fullmenu', 'other'],
    execute: async (sock, msg) => {
        const menu = `
╭─❀─╮
│  ✦ ASARTASH-MD MEGA MENU ✦
│  ⚡ 600+ Commands Loaded
╰─❀─╯

╭━─━─━─━─━─╮
┃  🎵 𝗣𝗟𝗔𝗬 + 𝗠𝗨𝗦𝗜𝗖 + 𝗦𝗢𝗨𝗡𝗗 🎵
╰━─━─━─━─━─╯
┃ 1. ◈ .play song name - YT Play
┃ 2. ◈ .song song name - MP3 Download
┃ 3. ◈ .video song name - MP4 Download
┃ 4. ◈ .lyrics song name - Lyrics
┃ 5. ◈ .pause - Pause Music
┃ 6. ◈ .resume - Resume
┃ 7. ◈ .skip - Next Song
┃ 8. ◈ .stop - Stop Music
┃ 9. ◈ .queue - Playlist
┃ 10. ◈ .loop - Loop Song
┃ 11. ◈ .bass - Bass Boost
┃ 12. ◈ .nightcore - Nightcore
┃ 13. ◈ .slowed - Slowed+Reverb
┃ 14. ◈ .speed - Speed Up
┃ 15. ◈ .earrape - Loud Sound
┃ 16. ◈ .reverse - Reverse Audio
┃ 17. ◈ .vibrate - Vibration
┃ 18. ◈ .dj - DJ Effect
┃ 19. ◈ .bassboost - Heavy Bass
┃ 20. ◈ .robot - Robot Voice
┃ 21. ◈ .chipmunk - Chipmunk Voice
┃ 22. ◈ .girl - Girl Voice
┃ 23. ◈ .boy - Boy Voice
┃ 24. ◈ .echo - Echo Effect
┃ 25. ◈ .tremolo - Tremolo
┃ 26. ◈ .speak text - TTS
┃ 27. ◈ .sound1 to .sound50 - 50+ Sound Effects

╭━─━─━─━─━─╮
┃  👋 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 + 𝗟𝗘𝗙𝗧 👋
╰━─━─━─━─━─╯
┃ 51. ◈ .welcome on - Welcome On
┃ 52. ◈ .welcome off - Welcome Off
┃ 53. ◈ .setwelcome text - Set Welcome Msg
┃ 54. ◈ .getwelcome - Show Welcome Msg
┃ 55. ◈ .left on - Left Msg On
┃ 56. ◈ .left off - Left Msg Off
┃ 57. ◈ .setleft text - Set Left Msg
┃ 58. ◈ .getleft - Show Left Msg
┃ 59. ◈ .wimage - Welcome Image
┃ 60. ◈ .limage - Left Image

╭━─━─━─━─━─╮
┃  🎮 𝗚𝗔𝗠𝗘 + 𝗙𝗨𝗡 🎮
╰━─━─━─━─━─╯
┃ 61. ◈ .tictactoe - Game
┃ 62. ◈ .truth - Truth
┃ 63. ◈ .dare - Dare
┃ 64. ◈ .guess - Number Game
┃ 65. ◈ .quiz - Quiz
┃ 66. ◈ .susp - Suspicious
┃ 67. ◈ .gay @tag - Gay Rate
┃ 68. ◈ .hot @tag - Hot Rate
┃ 69. ◈ .simp @tag - Simp Rate
┃ 70. ◈ .cutecheck - Cute Check

╭━─━─━─━─━─╮
┃  🛠️ 𝗧𝗢𝗟𝗦 + 𝗘𝗗𝗜𝗧 🛠️
╰━─━─━─━─━─╯
┃ 71. ◈ .toimage - Sticker to Image
┃ 72. ◈ .tovideo - Sticker to Video
┃ 73. ◈ .removebg - BG Remove
┃ 74. ◈ .blur - Blur Image
┃ 75. ◈ .circle - Circle Image
┃ 76. ◈ .blackwhite - B&W
┃ 77. ◈ .contrast - Contrast
┃ 78. ◈ .rotate - Rotate Image
┃ 79. ◈ .resize - Resize Image
┃ 80. ◈ .crop - Crop Image
┃ 81. ◈ .flip - Flip Image
┃ 82. ◈ .mirror - Mirror Image
┃ 83. ◈ .invert - Invert Colors
┃ 84. ◈ .greyscale - Greyscale
┃ 85. ◈ .sepia - Sepia Effect

╭━─━─━─━─━─╮
┃  📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 📥
╰━─━─━─━─━─╯
┃ 86. ◈ .ytmp3 link - YT MP3
┃ 87. ◈ .ytmp4 link - YT MP4
┃ 88. ◈ .tiktok link - Tiktok No WM
┃ 89. ◈ .insta link - Insta Video
┃ 90. ◈ .fb link - Facebook Video
┃ 91. ◈ .twitter link - Twitter Video
┃ 92. ◈ .spotify link - Spotify
┃ 93. ◈ .mediafire link - Mediafire
┃ 94. ◈ .gdrive link - Google Drive
┃ 95. ◈ .apk name - APK Download

╭━─━─━─━─╮
┃  🔍 𝗦𝗘𝗔𝗥𝗖𝗛 + 𝗜𝗡𝗙𝗢 🔍
╰━─━─━─━─╯
┃ 96. ◈ .google text - Google Search
┃ 97. ◈ .ytsearch text - YT Search
┃ 98. ◈ .pinterest text - Pics
┃ 99. ◈ .wiki text - Wikipedia
┃ 100. ◈ .weather city - Mausam
┃ 101. ◈ .time country - Time
┃ 102. ◈ .currency - Rate
┃ 103. ◈ .calc 2+2 - Calculator
┃ 104. ◈ .qr text - QR Code
┃ 105. ◈ .readqr - Read QR

╭━─━─━─━─━─╮
┃  👑 𝗢𝗪𝗡𝗘𝗥 + 𝗚𝗖 👑
╰━─━─━─━─╯
┃ 106. ◈ .broadcast text - Sab ko msg
┃ 107. ◈ .ban @user - Ban
┃ 108. ◈ .unban @user - Unban
┃ 109. ◈ .join link - Join GC
┃ 110. ◈ .leave - Leave GC
┃ 111. ◈ .shutdown - Bot Off
┃ 112. ◈ .restart - Bot Restart
┃ 113. ◈ .setprefix - Prefix Change
┃ 114. ◈ .add 92xxx - Add Member
┃ 115. ◈ .kick @tag - Kick

╭────────────╮
│  💎 𝗧𝗼𝘁𝗮𝗹: 115+ 𝗖𝗼𝗺𝗮𝗻𝗱𝘀
│  🎵 𝗠𝘂𝘀𝗶𝗰 + 𝗦𝗼𝘂𝗻𝗱 + 𝗪𝗲𝗹𝗰𝗼𝗺𝗲
╰────────────╯

> 𝗡𝗼𝘁𝗲: .play .song .video ka real code 
> baad mein add karna parega API ke sath
> 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘈𝘴𝘢𝘥 𝘛𝘦𝘤𝘩𝘟 🚩
        `;
        await sock.sendMessage(msg.key.remoteJid, { text: menu }, { quoted: msg });
    }
}
