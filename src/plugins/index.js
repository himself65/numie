import includes from 'lodash/includes'
import { getArgs, isOrder } from "../utils";

const onGroup = {
  name: 'message.group',
  callback: (numie, context, args) => {
    const groups = numie.conf.listen_groups_id
    const message = context.message
    const group_id = context.group_id
    if (includes(groups, group_id)) {
      console.log('match qq group:', group_id)
      if (isOrder(message)) {
        console.log('match qq message:', message)
        const index = args[0]
        console.log(index)
        const msg = index && numie.commands[index].callback(numie.bot, getArgs(args)) || ''
        numie.bot('send_group_msg', {
          group_id: group_id,
          message: msg
        })
      }
    }
  }
}

export {
  onGroup
}
