import { memo, useCallback, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import StarIcon from '@/shared/assets/icons/star.svg'
import { Icon } from '../Icon/Icon'

const stars = [1, 2, 3, 4, 5]

interface StarRatingProps {
  className?: string
  onSelect?: (starsNumber: number) => void
  size?: number
  selectedStars?: number
}

export const StarRating = memo((props: StarRatingProps) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

  // Поскольку итерируемся по массиву, для каждой звезды не получится указывать ее номер без замыкания
  const onHover = useCallback(
    (starNumber: number) => () => {
      if (!isSelected) {
        setCurrentStarsCount(starNumber)
      }
    },
    [isSelected]
  )

  const onLeave = useCallback(() => {
    if (!isSelected) {
      setCurrentStarsCount(0)
    }
  }, [isSelected])

  const onClick = (starNumber: number) => () => {
    if (!isSelected) {
      onSelect?.(starNumber)
      setCurrentStarsCount(starNumber)
      setIsSelected(true)
    }
  }

  const modsFunc = (starNumber: number) => ({
    [cls.hovered]: currentStarsCount >= starNumber,
    [cls.normal]: currentStarsCount < starNumber,
    [cls.selected]: isSelected
  })

  useEffect(() => {
    if (selectedStars === 0) {
      setCurrentStarsCount(0)
      setIsSelected(false)
    } else {
      setCurrentStarsCount(selectedStars)
      setIsSelected(true)
    }
  }, [selectedStars])

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(cls.starIcon, modsFunc(starNumber), [])}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={size}
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  )
})
