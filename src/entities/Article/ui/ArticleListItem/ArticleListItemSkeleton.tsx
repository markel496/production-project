import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { ArticleView } from '../../model/consts/articleConsts'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { Card } from '@/shared/ui/Card/Card'

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleView
}

export const ArticleListItemSkeleton = (
  props: ArticleListItemSkeletonProps
) => {
  const { className, view } = props

  if (view === ArticleView.BIG) {
    return (
      <Card className={classNames('', {}, [className, cls[view]])}>
        <div className={cls.header}>
          <div className={cls.user}>
            <Skeleton
              className={cls.avatar}
              width={50}
              height={50}
              border="50%"
            />
            <Skeleton width={150} height={24} />
          </div>
          <Skeleton className={cls.date} width={100} height={16} />
        </div>
        <Skeleton className={cls.title} width="70%" height={24} />
        <Skeleton className={cls.types} width="50%" height={16} />
        <Skeleton height={200} />
        <div className={cls.footer}>
          <Skeleton width={160} height={35} />
          <Skeleton className={cls.views} width={60} height={16} />
        </div>
      </Card>
    )
  }

  return (
    <Card className={classNames('', {}, [className, cls[view]])}>
      <Skeleton width={200} height={200} />

      <div className={cls.infoWrapper}>
        <Skeleton width={100} height={16} />
        <Skeleton className={cls.views} width={50} height={16} />
      </div>
      <Skeleton className={cls.title} width={200} height={16} />
    </Card>
  )
}
