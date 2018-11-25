import isArrayLike from 'lodash/isArrayLike'
import isArray from 'lodash/isArray'
import tail from 'lodash/tail'

import config from '../config'

export {} from './logger'

export function getArgs (value) {
  if (!isArrayLike(value)) return {}
  else if (isArray(value)) return tail(value)
  else return tail(value.split(' '))
}

export function isOrder (message, prefixes = config.prefix_instructions) {
  return prefixes.some(value => {
    return value.test(message)
  })
}

export class Tagger {
  constructor (props = { length: 10 }) {
    this.ids = []
    this.len = props.length
  }

  hasVisited (value) {
    if (this.ids.indexOf(value) === -1) {
      this.ids.push(value)
      if (this.ids.length >= this.len)
        this.ids.shift()
      return false
    }
    return true
  }
}
