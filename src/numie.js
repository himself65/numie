import { CQWebSocket } from 'cq-websocket'
import Callable from './utils/callable'
import config from './config'

class Numie extends Callable {

  constructor (config) {
    super('__call__')
    this._config = config
    this.commands = {}
    this.retryInterval = 1000
    const conf = this._config
    this.botConf = {
      api_url: conf.api_root,
      access_token: conf.access_token,
      enableAPI: true,
      enableEvent: true,
      host: conf.cql_host,
      port: conf.cql_port,
    }

    console.log('init NUMIE success.')
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
      console.log('bot: socket has closed.')
      this.reconnect();
    })

    this.bot.on('socket.error', () => {
      console.error('bot: socket error.')
      this.reconnect();
    })

    this.bot.on('ready', () => {
      console.log('bot: ready.')
    })

    console.log('Numie: init finished.')

    // events handle
    this._events = {}
  }

  __call__ (event, middleware) {
    if (!this.bot) {
      throw new Error('Bot has not been initialized.')
    }
    // todo
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

  async connect (conf) {
    console.log('Numie: connecting...')
    await this.initWebSocket(conf || this.botConf)
  }

  on (event, listener) {
    return this.bot.on(event, listener)
  }

  once (event, listener) {
    return this.bot.once(event, listener)
  }

  off (event, listener) {
    return this.bot.off(event, listener)
  }
}

const numie = new Numie(config)

export default numie
