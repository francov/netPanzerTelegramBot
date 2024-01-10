NetPanzer Telegram Bot
======================

Script that checks the netpanzer server-browser for online players and
sends notifications on a Telegram Channel via a Telegram Bot

Prerequisites
=============

* nodejs, npm
* pm2 - npm package

Installation
============

Create a file named `envfile` in the current directory and set the following
environment variables:

```
export TELEGRAM_CHAT_ID='<chatId'
export TELEGRAM_BOT_TOKEN='<botApiToken>'
```

Then install dependencies:

```
npm install -g pm2
cd netPanzerTelegramBot
npm install
```

And finally:

```
Usage:
  ./np_bot.sh start
  ./np_bot.sh stop
  ./np_bot.sh restart
```

You can change POLLING_INTERVAL value in the script in milliseconds
to change the interval of the checks that are done.

