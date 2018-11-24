import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import tail from 'lodash/tail'

import config from '../config'

export {} from './logger'

export function getArgs (value) {
  if (!isString(value)) return {}
  else if (isArray(value)) return tail(value)
  else return tail(value.split(' '))
}

export function isOrder (message, prefixes = config.prefix_instructions) {
  return prefixes.some(value => {
    return value.test(message)
  })
}
