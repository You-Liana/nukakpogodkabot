const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const axios = require('axios');

const token = '1426215345:AAFgszqtgBheWUpzxby9A1aGYKuvpE2Gq1g'; // тут токен от botFather

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
			text: 'Казань',
			callback_data: 'Kazan'
		}
	],
	[
		{
			text: 'Сочи',
			callback_data: 'Sochi'
		}
	],
	[
		{
			text: 'Анапа',
			callback_data: 'Anapa'
		}
	],
	[
		{
			text: 'Иркутск',
			callback_data: 'Irkutsk'
		}
	],
	[
		{
			text: 'Пермь',
			callback_data: 'Perm'
		}
	]
];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
	console.log('msg = ', msg);
	const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

	// отправляем сообщение
	bot.sendMessage(chatId, 'В каком городе нужно узнать погоду?', { // прикрутим клаву
		reply_markup: {
			inline_keyboard: keyboard
		}
	});
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', async (query) => {
	console.log('query = ', query);
	let url;
	const chatId = query.message.chat.id;

	if (query.data === 'Spb') { // С-Пб
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Saint%20Petersburg&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}
	if (query.data === 'Msc') { // Мск
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}
	if (query.data === 'Kazan') { // Казань
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Kazan&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}
	if (query.data === 'Sochi') { // Сочи
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Sochi&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}
	if (query.data === 'Anapa') { // Анапа
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Anapa&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}
	if (query.data === 'Irkutsk') { // Иркутск
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Irkutsk&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}
	if (query.data === 'Perm') { // Пермь
		url = 'http://api.openweathermap.org/data/2.5/weather?q=Perm&appid=1f89c71fe311f8fc257f5aa6e5f9f761&units=metric&lang=ru' //внешняя ссылка
	}

	if (url) {
		const { data } = await axios(url);
        console.log('data = ', data);
        const text = `Город: ${data.name}, температура: ${data.main.temp}, минимальная температура: ${data.main.temp_min}, максимальная температура: ${data.main.temp_max}`;
		return bot.sendMessage(chatId, text, { // прикрутим клаву
			reply_markup:
				{
					inline_keyboard: keyboard
				}
		});
	}
	return bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
		reply_markup: {
			inline_keyboard: keyboard
		}
	});
});