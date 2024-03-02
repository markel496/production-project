import { fetchNextArticles } from './fetchNextArticles'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk'
import { fetchArticles } from '../fetchArticles/fetchArticles'

jest.mock('../fetchArticles/fetchArticles')

describe('fetchNextArticles.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticles, {
      articles: {
        isLoading: false,
        page: 3,
        hasMore: true,
        limit: 5,
        ids: [],
        entities: {},
        _inited: true
      }
    })

    await thunk.callThunk()

    //Проверка, что dispatch вызвался 4 раза. 1 - pending; 2 - fullfiled; 3,4 - внутри fetchNextArticles
    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticles).toHaveBeenCalledWith({ page: 4 })
  })

  test('fetchArticles not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticles, {
      articles: {
        isLoading: false,
        page: 3,
        hasMore: false,
        limit: 5,
        ids: [],
        entities: {},
        _inited: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticles).not.toHaveBeenCalled()
  })

  test('fetchArticles not called with isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticles, {
      articles: {
        isLoading: true,
        page: 3,
        hasMore: true,
        limit: 5,
        ids: [],
        entities: {},
        _inited: true
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticles).not.toHaveBeenCalled()
  })
})
