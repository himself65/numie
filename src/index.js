import Koa from 'koa'

const app = new Koa()


app.listen(3005, () => {
  console.log('loaded')
})
