import { addCommand } from '../'

function command(name, description) {
  return function (target) {
    const newCommand = {
      name: name,
      description: description,
      fn: target
    }
    addCommand(newCommand)
  }
}

@command("help", "帮助")
function help(bot, context) {

}
