import { initArticlesPage } from './initArticlesPage'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk'
import { fetchArticles } from '../fetchArticles/fetchArticles'

jest.mock('../fetchArticles/fetchArticles')

describe('initArticlesPage.test', () => {
  test('with inited = false', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articles: {
        _inited: false
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticles).toHaveBeenCalled()
  })

  test('with inited = true', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articles: {
        _inited: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticles).not.toHaveBeenCalled()
  })
})
