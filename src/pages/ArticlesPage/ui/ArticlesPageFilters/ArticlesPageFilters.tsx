import { memo, useCallback, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPageFilters.module.scss'
import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import { ViewSelector } from 'features/viewSelector'
import { useTranslation } from 'react-i18next'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input/Input'
import { SortSelector } from 'features/sortSelector'
import { useSelector } from 'react-redux'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../model/selectors/articlesPageSelectors'
import { SortOrder } from 'shared/types/sort'
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { HStack } from 'shared/ui/Stack'

interface ArticlesPageFiltersProps {
  className?: string
  view: ArticleView
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className, view } = props
  const { t } = useTranslation('articles')

  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const dispatch = useAppDispatch()

  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      { value: ArticleType.ALL, content: t('Все') },
      { value: ArticleType.ECONOMICS, content: t('Экономика') },
      { value: ArticleType.IT, content: t('Айти') },
      { value: ArticleType.POLITICS, content: t('Политика') },
      { value: ArticleType.SCIENCE, content: t('Наука') },
      { value: ArticleType.SPORT, content: t('Спорт') }
    ],
    [t]
  )

  const fetchData = useCallback(() => {
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
    <div className={classNames('', {}, [className])}>
      <HStack className={cls.sortWrapper} justify="between">
        <SortSelector
          sort={sort}
          order={order}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
        <ViewSelector view={view} onViewClick={onChangeView} />
      </HStack>
      <Card className={cls.search}>
        <Input
          value={search}
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
        />
      </Card>
      <Tabs tabs={typeTabs} value={type} onTabClick={onChangeTab} />
    </div>
  )
})
