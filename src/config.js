const commands = [
  {
    name: '帮助',
    index: 'help',
    describe: '获取所有的指令',
    callback: function (bot, args) {
      let tmp = '指令大全:'
      for (const key in commands) {
        const cmd = commands[key]
        tmp = `${tmp}\n ${cmd.name}: ${cmd.index} -- ${cmd.describe} `
      }
      return tmp
    }
  }, {
    name: '代码',
    index: 'exec',
    describe: '执行代码',
    callback: function (bot, args) {
      // todo
      return '暂无'
    }
  }
]

const setting = {
  api_root: 'localhost:5700',
  access_token: '',
  secret: '',
  cql_host: 'localhost',
  cql_port: 6700,
}

const bot = {
  listen_groups_id: [718459861],
  listen_privates_id: [761282619],
  prefix_instructions: [/^-b/]
}

export default {
  ...setting,
  ...bot,
  commands: commands
}
