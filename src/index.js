import { forEach } from 'lodash'
import Koa from 'koa'
import numie from './numie'

const app = new Koa()

// connect coolq with ws
numie.connect()

numie.on('message', async (event, context) => {
  const message = context.message
  if (/^签到排名$/.test(message)) {
    let res = ''
    try {
      const data = await require('./plugins').getRating()
      forEach(data, (v) => {
        const value = `QQ: ${v.id} | 积分: ${v.rating} | 总签到次数: ${v.times_all}`
        res = `${res}${value}\n`
      })
    } catch (e) {
      console.error(e)
      res = '发生错误'
    }
    return res.trim()
  }
})


app.listen(3005, () => {
  console.log('app loaded.')
})
