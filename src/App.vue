<template>
  <v-app id="app">
    <v-container>
      <h1>NUMIE</h1>
      <v-btn
        color="info"
        @click="sendMsgToAuthor"
      >
        发消息给面包
      </v-btn>
    </v-container>
  </v-app>
</template>

<script>
  import { Numie } from './numie'
  import config from './config'

  const commands = config.commands

  export default {
    name: "App",
    data () {
      return {
        bot: new Numie({
          conf: config
        })
      }
    },
    async mounted () {
      await this.bot.connect()
      await this.bot.initEvents()
      this.bot.registerCommand(commands)
    },
    methods: {
      sendMsgToAuthor () {  // fixme: remove this function
        try {
          this.bot.bot('send_private_msg', {
            user_id: 761282619, // author_id
            message: '您点击了发送消息'
          }, {
            timeout: 10000
          }).then((res) => {
            console.log(res)
          })
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
</script>

<style lang="stylus">
  #app {
    font-family 'Roboto', sans-serif
    text-align center
    color #2c3e50
    margin-top 60px
  }
</style>
