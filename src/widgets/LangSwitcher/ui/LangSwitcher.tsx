import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button className={className} onClick={toggle} theme={ButtonTheme.CLEAR}>
      {t(short ? 'Короткий язык' : 'Язык')}
    </Button>
  )
})
