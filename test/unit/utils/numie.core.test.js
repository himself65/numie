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
