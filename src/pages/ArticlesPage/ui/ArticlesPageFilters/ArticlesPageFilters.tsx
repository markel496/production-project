import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { ArticleSortSelector } from '@/features/articleSortSelector'
import { ArticleViewSelector } from '@/features/articleViewSelector'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { TabItem } from '@/shared/ui/Tabs'
import { HStack } from '@/shared/ui/Stack'
import { ArticleSearch } from '@/features/articleSearch'
import { ArticleTypeTabs } from '@/features/articleTypeTabs'

import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../model/selectors/articlesPageSelectors'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'

import cls from './ArticlesPageFilters.module.scss'

interface ArticlesPageFiltersProps {
  className?: string
  view: ArticleView
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className, view } = props

  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const dispatch = useAppDispatch()

  const fetchData = useCallback(() => {
    if (__PROJECT__ === 'storybook') return

    dispatch(fetchArticles({ replace: true }))
  }, [dispatch])

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch]
  )

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData]
  )

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData]
  )

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search))
      dispatch(articlesPageActions.setPage(1))
      debouncedFetchData()
    },
    [dispatch, debouncedFetchData]
  )

  const onChangeTab = useCallback(
    (newTab: TabItem<ArticleType>) => {
      dispatch(articlesPageActions.setType(newTab.value))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData]
  )

  return (
    <div className={className}>
      <HStack className={cls.stackWrapper} justify="between">
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} size={24} />
      </HStack>
      <ArticleSearch
        className={cls.search}
        search={search}
        onChangeSearch={onChangeSearch}
      />
      <ArticleTypeTabs value={type} onChangeTab={onChangeTab} />
    </div>
  )
})
