import { classNames } from '@/shared/lib/classNames/classNames'

import { Loader } from '@/shared/ui/Loader'
import { HStack } from '@/shared/ui/Stack'

import cls from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <HStack
      className={classNames(cls.PageLoader, {}, [className])}
      justify="center"
      max
    >
      <Loader />
    </HStack>
  )
}
