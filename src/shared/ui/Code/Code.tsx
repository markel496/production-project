import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Code.module.scss'
import { Button, ButtonTheme } from '../Button/Button'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import { useCallback } from 'react'

interface CodeProps {
  className?: string
  text: string
}

export const Code = (props: CodeProps) => {
  const { className, text } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
        <CopyIcon onClick={onCopy} className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
}
