Проект для Netlify + Telegram bot

Структура:
- index.html — сайт
- netlify.toml — настройки Netlify
- netlify/functions/send-telegram.js — функция отправки заявок в Telegram

В Netlify Environment variables должны быть:
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID

Деплой лучше делать через GitHub: Add new site -> Import an existing project -> GitHub.
