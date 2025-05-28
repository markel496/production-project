import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { ArticleView } from '@/entities/Article'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'

import cls from './ArticleViewSelector.module.scss'

const viewTypes = [
  {
    icon: ListIcon,
    view: ArticleView.BIG
  },
  {
    icon: TiledIcon,
    view: ArticleView.SMALL
  }
]

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
  size?: number
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick, size } = props

  //onClick аргументом всегда принимает event, но мне надо также передавать новый вид отображения, который выбрал пользователь. Поэтому тут воспользовался замыканием
  const onClick = (viewType: ArticleView) => () => onViewClick(viewType)

  return (
    <HStack className={className}>
      {viewTypes.map((viewType) => (
        <Button
          className={classNames(
            cls.button,
            { [cls.selected]: viewType.view === view },
            []
          )}
          onClick={onClick(viewType.view)}
          theme={ButtonTheme.CLEAR}
          key={viewType.view}
          disabled={viewType.view === view}
        >
          <Icon Svg={viewType.icon} width={size} height={size} />
        </Button>
      ))}
    </HStack>
  )
})
