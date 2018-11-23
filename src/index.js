import config from '../config.default'

const commands = []

export function addCommand (cmd) {
  const { name, description, callback } = cmd
  commands[name] = {
    name: name,
    description: description,
    callback: callback
  }
}

const CQHttp = require('cqhttp')

const bot = new CQHttp({
  apiRoot: config.api_root,
  accessToken: config.access_token,
  secret: config.secret
})

bot.listen(8080)
