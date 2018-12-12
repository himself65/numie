import { CQWebSocket } from 'cq-websocket'
import { getArgs, Tagger } from "../utils"
import EventEmitter from 'events'

export default class NumieCore extends EventEmitter {
  constructor (props) {
    super()
    this.conf = props.conf
    this.commands = {}
    this.retryInterval = 1000
    const conf = this.conf
    this.botConf = {
      api_url: conf.api_root,
      access_token: conf.access_token,
      enableAPI: true,
      enableEvent: true,
      host: conf.cql_host,
      port: conf.cql_port,
    }

    console.log('init NUMIE success', this)
  }

  async initWebSocket (conf) {
    this.bot = new CQWebSocket({
      access_token: conf.access_token,
      enableAPI: true,
      enableEvent: true,
      host: conf.host,
      port: conf.port,
    })

    await this.bot.connect()

    this.bot.on('socket.connect', () => {
      this.retryInterval = 1000;
    })

    this.bot.on('socket.close', () => {
      console.log('socket has closed.')
      this.reconnect();
    })

    this.bot.on('socket.error', () => {
      console.error('socket error.')
      this.reconnect();
    })

    this.bot.on('ready', () => {
      console.log('ready')
    })

    console.log('init finished.')
  }

  reconnect () {
    this.retryInterval *= 2
    if (this.retryInterval > 300000) this.retryInterval = 300000
    console.warn(`retrying in ${this.retryInterval / 1000}s...`)
    setTimeout(async () => {
      console.warn('reconnecting to websocket...')
      await this.connect()
    }, this.retryInterval)
  }

  registerCommand (items) {
    for (const k in items) {
      const item = items[k]
      this.commands[item.index] = {
        name: item.name,
        index: item.index,
        describe: item.describe,
        callback: item.callback
      }
    }
  }

  async connect (conf) {
    await this.initWebSocket(conf || this.botConf)
    console.log('connecting...')
  }

  async initEvents () {
    try {
      const events = require('../plugins')
      console.log(events)
      for (const k in events) {
        const tagger = new Tagger()
        const event = events[k]
        await this.bot.on(event.name, (_, context) => {
          if (event !== undefined && !tagger.hasVisited(context.message_id)) {
            const message = context.message
            const args = getArgs(message) // has removed the first element;
            event.callback(this, context, args)
          }
        })
      }
      console.log('events loaded.')
    } catch (err) {
      console.error(err)
    }
  }
}
