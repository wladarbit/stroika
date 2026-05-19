exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { statusCode: 500, body: 'Telegram environment variables are not set' };
  }

  let data = {};
  try {
    data = JSON.parse(event.body || '{}');
  } catch (error) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const clean = (value) => String(value || '').replace(/[<>&]/g, '').trim();

  const text = [
    '🔥 Новая заявка с сайта AI Строй',
    '',
    `👤 Имя: ${clean(data.name) || 'не указано'}`,
    `📲 Telegram / телефон: ${clean(data.contact) || 'не указано'}`,
    `🏗 Ниша: ${clean(data.niche) || 'не указано'}`,
    `💬 О бизнесе: ${clean(data.about) || 'не указано'}`,
    '',
    'Источник: сайт'
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { statusCode: 502, body: errorText };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
