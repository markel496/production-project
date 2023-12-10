import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { t } = useTranslation('articles')
  const { className } = props

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      {t('Страница со статьями')}
    </div>
  )
}

export default memo(ArticlesPage)
