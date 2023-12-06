import { validateProfileAge } from './validateProfileAge'

describe('validateProfileAge.test', () => {
  test('correct', () => {
    expect(validateProfileAge('30')).toBe(true)
  })

  test('correct with no age', () => {
    expect(validateProfileAge()).toBe(true)
  })

  test('age < 0', () => {
    expect(validateProfileAge('-1')).toBe(false)
  })

  test('age = 0', () => {
    expect(validateProfileAge('0')).toBe(false)
  })

  test('age > 99', () => {
    expect(validateProfileAge('100')).toBe(false)
  })

  test('regex 1', () => {
    expect(validateProfileAge('qwef')).toBe(false)
  })

  test('regex 2', () => {
    expect(validateProfileAge('34c')).toBe(false)
  })
})
