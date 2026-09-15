# Express IELTS Telegram Bot

Express IELTS o'quv markazi uchun Telegram bot.

## O'rnatish

```bash
git clone https://github.com/huzayfa0/leits-express-bot.git
cd leits-express-bot
npm install
```

## Sozlash

`.env` fayl yarating:

```
TELEGRAM_BOT_TOKEN=your_token_here
ADMIN_GROUP_ID=your_group_id_here
```

## Ishga tushirish

```bash
node bot.js
```

## pm2 bilan doimiy ishga tushirish (Linux server)

```bash
npm install -g pm2
pm2 start bot.js --name "express-ielts-bot"
pm2 startup
pm2 save
```

## Admin guruhni ulash

Botni guruhga qo'shib, guruhda `/setadmin` buyrug'ini yuboring.
