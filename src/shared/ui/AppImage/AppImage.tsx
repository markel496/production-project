import {
  ImgHTMLAttributes,
  ReactElement,
  memo,
  useLayoutEffect,
  useState
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  /**
   * Будет отображаться в момент загрузки
   */
  fallback?: ReactElement
  /**
   * Будет отображаться, если произошла какая-то ошибка
   */
  errorFallback?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    src,
    alt = 'image',
    fallback,
    errorFallback,
    ...otherProps
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  /**
   * useLayoutEffect вызовется до того, как react-комонент вмонтируется в dom, т.е. подгрузка изображения начнется еще до того момента, как отрендерится компонент
   */
  useLayoutEffect(() => {
    const img = new Image()
    img.src = src ?? ''
    img.onload = () => {
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
  }, [src])

  if (isLoading && fallback) return fallback

  if (hasError && errorFallback) return errorFallback

  return <img className={className} src={src} alt={alt} {...otherProps} />
})
