const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = '1426215345:AAFgszqtgBheWUpzxby9A1aGYKuvpE2Gq1g'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
        {
          text: 'Москва',
          callback_data: 'Msc'
        }
    ],
    [
        {
          text: 'Санкт-Петербург',
          callback_data: 'Spb'
        }
    ],
    [
        {
          text: 'Выход',
         //
        }
    ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет! В каком городе нужно узнать погоду?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;


    if (query.data === 'Spb') { // С-Пб
        url:'http://maps.openweathermap.org/maps/2.0/weather?q=Saint-Petersburg,ru&APPID={1f89c71fe311f8fc257f5aa6e5f9f761}' //внешняя ссылка
    }

    if (query.data === 'Msc') { // Мск
        url:'http://maps.openweathermap.org/maps/2.0/weather?q=Moscow,ru&APPID={1f89c71fe311f8fc257f5aa6e5f9f761}' //внешняя ссылка
    }

    if (url) {
        bot.sendPhoto(chatId, url, { // прикрутим клаву
            reply_markup: 
            {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });