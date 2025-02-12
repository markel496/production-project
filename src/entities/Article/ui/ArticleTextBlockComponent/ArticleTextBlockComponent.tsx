import cls from './ArticleTextBlockComponent.module.scss'
import { ArticleTextBlock } from '../../model/types/article'
import { Text } from '@/shared/ui/Text/Text'
import { memo } from 'react'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props

    return (
      <div className={className}>
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    )
  }
)
