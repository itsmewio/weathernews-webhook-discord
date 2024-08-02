Dieses Skript ist gemacht für ein Discord Server, darf aber auch von anderen genutzt werden.

Es hat die Funktion täglich frühs um 6:45 Uhr (Uhrzeit einstellbar) ein Wetterbericht zu versenden via Webhook an ein Discord Channel.


"Willkommen in der Wetterschau, hier spricht Freddy Mauz.
Es ist 22:01, der 02.08.24. ⏰

Kommen wir zum Wetter in manchen Städten:
☁️ In Hamburg sind es 18°.
🌙 In Berlin sind es 19°.
🌙 In Frankfurt sind es 23°.
🌙 In Dresden sind es 16°.
🌧️ In Stuttgart sind es 21°.
☁️ In München sind es 18°."

Dafür werden echte Wetter Daten benutzt sowie die aktuelle Uhrzeit und Datum.

1. Um den Bot benutzen zu können wird node.js benötigt. (Einfach herunterladen auf der offiziellen Seite)
2. Ändere in der weatherBot.js Datei den Webhook-Link und deine OpenWeatherAPI.
2. Öffne im Ordner die cmd und gebe "npm i" ein.
3. Danach kannst du die cmd schließen und das Skript über die start.bat starten.

-> Wenn du die Uhrzeit ändern möchtest musst du einfach in der WeatherBot.js Datei einfach ganz unten "scheduleWeatherReport(6, 45);" die 6 und die 45 ändern. 12:30 wäre z.B. (12, 30).

Viel Spaß :)
