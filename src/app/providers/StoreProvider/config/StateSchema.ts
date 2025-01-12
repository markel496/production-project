import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from '@/entities/Article'
import { CounterSchema } from '@/entities/Counter'
import { EditableProfileCardSchema } from '@/features/editableProfileCard'
import { UserSchema } from '@/entities/User'
import { LoginSchema } from '@/features/AuthByUsername'
import { ArticleCommentsSchema } from '@/features/articleComments'
import { ArticlesPageSchema } from '@/pages/ArticlesPage'
import { rtkApi } from '@/shared/api/rtkApi'
import { SaveScrollSchema } from '@/widgets/Page'

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  counter: CounterSchema
  user: UserSchema
  scrollPosition: SaveScrollSchema

  //Async reducers
  loginForm?: LoginSchema
  profile?: EditableProfileCardSchema
  articleDetails?: ArticleDetailsSchema
  articles?: ArticlesPageSchema
  articleComments?: ArticleCommentsSchema
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
