import { memo } from 'react'

import { Text, TextAlign } from '@/shared/ui/Text'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'

import { ArticleImageBlock } from '../../model/types/article'

import cls from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props

    return (
      <div className={className}>
        <AppImage
          className={cls.img}
          src={block.src}
          alt={block.title}
          fallback={<Skeleton height={200} />}
        />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    )
  }
)
