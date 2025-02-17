import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ViewSelector.module.scss'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { ArticleView } from '@/entities/Article'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'

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

interface ViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
}

export const ViewSelector = memo((props: ViewSelectorProps) => {
  const { className, view, onViewClick } = props

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
          <Icon Svg={viewType.icon} />
        </Button>
      ))}
    </HStack>
  )
})
