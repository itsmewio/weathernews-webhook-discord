const axios = require('axios');
const schedule = require('node-schedule');
const moment = require('moment-timezone');

// Funktion zum Abrufen des Wetters
async function getWeather(city) {
    const apiKey = 'CHANGE_IT_TO_YOUR_API_KEY!'; // ÄNDERN! -> Erstelle dir ein Konto auf https://openweathermap.org/ und erstelle dir ein API-Key den du hier einfügst.
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;  //nicht ändern!
    try {
        const response = await axios.get(url);
        const temp = Math.floor(response.data.main.temp);  // Abrunden der Temperatur
        const weather = response.data.weather[0].main;
        return { temp, weather };
    } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return { temp: 'N/A', weather: 'N/A' };
    }
}

// Funktion zum Erstellen der Wettermeldung
async function createWeatherMessage() {
    const cities = ['Hamburg', 'Berlin', 'Frankfurt', 'Dresden', 'Stuttgart', 'München'];
    const weatherData = await Promise.all(cities.map(getWeather));

    const emojis = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Thunderstorm: '⛈️',
        Snow: '❄️',
        Mist: '🌫️',
        NightClear: '🌙',
        NightClouds: '☁️',
        NightRain: '🌧️',
        NightThunderstorm: '⛈️',
        NightSnow: '❄️',
        NightMist: '🌫️'
    };

    const now = moment().tz('Europe/Berlin');
    const time = now.format('HH:mm');
    const date = now.format('DD.MM.YY');

    const isNight = now.hour() >= 18 || now.hour() < 6;

    let message = `**Willkommen in der Wetterschau, hier spricht Wetterreporter Zeus Mauz.**\nEs ist ${time}, der ${date}. ⏰\n\nKommen wir zum Wetter:\n`;

    weatherData.forEach((data, index) => {
        const city = cities[index];
        let emoji = emojis[data.weather];
        if (isNight) {
            emoji = emojis[`Night${data.weather}`] || emojis[data.weather];
        }
        message += `${emoji} In ${city} sind es ${data.temp}°.\n`;
    });

    message += "\n*Ich hab immer Recht, auch wenn's bei euch in den Wetter-Apps evtl. anders steht!*";
    
    return message;
}

// Funktion zum Senden der Nachricht an den Discord-Webhook
async function sendDiscordMessage(message) {
    const webhookUrl = 'https://discord.com/api/webhooks/DEIN/WEBHOOK_MUSS_REIN'; // ÄNDERN! Dein Webhook kannst du in Discord erstellen und den Link hier einfügen https://support.discord.com/hc/de/articles/228383668-Einleitung-in-Webhooks
    try {
        await axios.post(webhookUrl, { content: message });
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}

// Funktion zur Planung des Jobs
function scheduleWeatherReport(hour, minute) {
    const rule = new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.minute = minute;

    schedule.scheduleJob(rule, async () => {
        const message = await createWeatherMessage();
        await sendDiscordMessage(message);
        console.log(`Wetterbericht gesendet um ${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`);
    });

    console.log(`Skript gestartet. Der Wetterbericht wird täglich um ${hour}:${minute} Uhr gesendet.`);
}

// Beispiel: Planung des Jobs um 7:45 Uhr, hier kannst du deine Uhrzeit beliebig ändern.
scheduleWeatherReport(6, 45);
