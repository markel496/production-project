import { getQueryParams } from './addQueryParams'

describe('addQueryParams.test', () => {
  test('test with one param', () => {
    const params = getQueryParams({ test: 'test123' })
    expect(params).toEqual('?test=test123')
  })

  test('test with multiple params', () => {
    const params = getQueryParams({ sort: 'views', order: 'asc' })
    expect(params).toEqual('?sort=views&order=asc')
  })

  test('test with undefined', () => {
    const params = getQueryParams({
      test: 'test',
      sort: undefined,
      order: undefined
    })
    expect(params).toEqual('?test=test')
  })
})
