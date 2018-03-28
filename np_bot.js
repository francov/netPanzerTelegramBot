/**
 * Script that checks online player from netpanzer.info serverbrowser
 * and send notifications to Telegram @netpanzergamers channel ('NetPanzer Gamers')
 * via the Telegram bot @NPWatchtowerBot
 */

const POLLING_INTERVAL = 900000

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const SERVERBROWSER_URL = `http://www.netpanzer.info/Server-Browser/JsonData/`
const TIMEOUT = 40000

const axios = require('axios')
const Telegram = require('telegraf/telegram')
const telegram = new Telegram(TELEGRAM_BOT_TOKEN)

let allPlayers = []
const checkOnlinePlayers = async () => {
  try {
    let res = await axios.get(SERVERBROWSER_URL, {
      timeout: TIMEOUT,
      params: { _: '' },
    })
    let message = ''
    let notify = 0
    let peopleIn = 0
    let newPlayers = []
    res.data.map(gameserver => {
      if (typeof gameserver.error === 'undefined' && parseInt(gameserver.numplayers) > 0) {
        let num = parseInt(gameserver.numplayers)
        gameserver.players.map(p => {
          newPlayers.push(p.player)
        })
        message += `${num} ${num == 1 ? 'player' : 'players'} online (${newPlayers.join(', ')})  on server "${
          gameserver.hostname
        }"!\n`
        peopleIn = 1
      }
    })
    newPlayers.sort()
    if (peopleIn && allPlayers.join('_') !== newPlayers.join('_')) {
      notify = 1
    }
    allPlayers = newPlayers
    console.log('PLAYERS: ', allPlayers.join('_'))
    console.log('NOTIFY: ', notify)
    if (notify) {
      await telegram.sendMessage(TELEGRAM_CHAT_ID, message)
    }
  } catch (e) {
    console.log(e)
  }
}

checkOnlinePlayers()
setInterval(async () => {
  await checkOnlinePlayers()
}, POLLING_INTERVAL)
