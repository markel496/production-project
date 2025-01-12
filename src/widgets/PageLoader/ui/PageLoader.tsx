import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PageLoader.module.scss'
import { Loader } from '@/shared/ui/Loader/Loader'
import { HStack } from '@/shared/ui/Stack'

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
