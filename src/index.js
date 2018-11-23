import config from './config'

const CQHttp = require('cqhttp')

const bot = new CQHttp({
  apiRoot: config.api_root,
  accessToken: config.access_token,
  secret: config.secret
})

bot.listen(8080)
