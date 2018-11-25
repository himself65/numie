import { getArgs, Tagger } from "@/utils"

it('Regular expression 1', () => {
  let pattern = /^-b/
  expect(pattern.test('-b')).toBeTruthy()
  expect(pattern.test('-d')).toBeFalsy()
  expect(pattern.test('-bread')).toBeTruthy()
})

it('Regular group expression', () => {
  let patterns = [
    /^-b\b/,
    /^help\b/
  ]
  const check = (str, pattern) => {
    return pattern.test(str)
  }
  expect(patterns.some((value) => {
    return check('-bread', value)
  })).toBeFalsy()
  expect(patterns.some((value) => {
    return check('-b lst', value)
  })).toBeTruthy()
  expect(patterns.some((value) => {
    return check(' help', value)
  })).toBeFalsy()
})


it('getArgs test', () => {
  expect(getArgs([1, 2, 3])).toEqual([2, 3])
  expect(getArgs('-b help shit')).toEqual(['help', 'shit'])
})

it('Tagger test', () => {
  const tagger = new Tagger({ length: 2 })
  expect(tagger.len).toEqual(2)
  expect(tagger.hasVisited(1)).toBeFalsy()
  expect(tagger.hasVisited(1)).toBeTruthy()
  expect(tagger.hasVisited(2)).toBeFalsy()
  expect(tagger.hasVisited(3)).toBeFalsy()
  expect(tagger.hasVisited(1)).toBeFalsy()
})
