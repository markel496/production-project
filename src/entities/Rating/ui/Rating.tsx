import { createRef, memo, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { BrowserView, MobileView } from 'react-device-detect'

import { Card } from '@/shared/ui/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import { StarRating } from '@/shared/ui/StarRating'
import { Modal } from '@/shared/ui/Modal'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Drawer } from '@/shared/ui/Drawer'

import cls from './Rating.module.scss'

interface RatingProps {
  className?: string
  rating?: number
  title?: string
  feedbackTitle?: string
  placeholder?: string
  hasFeedback?: boolean
  onAccept?: (starsCount: number, feedback?: string) => void
  onReset?: () => void
}

export const Rating = memo((props: RatingProps) => {
  const {
    className,
    rating = 0,
    title,
    feedbackTitle,
    placeholder,
    hasFeedback,
    onAccept,
    onReset
  } = props

  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rating)
  const [feedback, setFeedback] = useState('')

  const cancelButtonRef = createRef<HTMLButtonElement>()

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount)
      if (hasFeedback) {
        setIsModalOpen(true)
      } else {
        onAccept?.(selectedStarsCount)
      }
    },
    [hasFeedback, onAccept]
  )

  const acceptHandle = useCallback(() => {
    onAccept?.(starsCount, feedback)
    setIsModalOpen(false)
  }, [feedback, onAccept, starsCount])

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false)
    setStarsCount(0)
  }, [])

  const modalContent = (type: string) => (
    <VStack gap="16" max data-testid="FeedbackModal">
      <Text title={feedbackTitle} />
      <textarea
        className={classNames(cls.textarea, {}, [type])}
        autoFocus
        placeholder={placeholder}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        data-testid="FeedbackModal.Textarea"
      />
    </VStack>
  )

  useEffect(() => {
    setStarsCount(rating)
  }, [rating])

  return (
    <Card className={className} data-testid="RatingCard">
      <VStack gap="8" align="center">
        <Text title={title} data-testid="RatingCard.Text" />
        <StarRating
          size={40}
          selectedStars={starsCount}
          onSelect={onSelectStars}
        />
        {rating !== 0 && (
          <Button
            className={cls.againRateBtn}
            theme={ButtonTheme.CLEAR}
            onClick={onReset}
            data-testid="RatingCard.ResetBtn"
          >
            {t('Оценить статью заново')}
          </Button>
        )}
      </VStack>

      <BrowserView>
        <Modal
          isOpen={isModalOpen}
          onClose={cancelHandle}
          closeButtonRef={cancelButtonRef}
          lazy
        >
          <VStack className={cls.modalContent} gap="32" max>
            {modalContent(cls.modal)}
            <HStack justify="end" gap="16" max>
              <Button
                ref={cancelButtonRef}
                theme={ButtonTheme.OUTLINE_RED}
                data-testid="FeedbackModal.CancelBtn"
              >
                {t('Отмена')}
              </Button>
              <Button
                onClick={acceptHandle}
                data-testid="FeedbackModal.SendBtn"
              >
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
          <VStack className={cls.drawerWrapper} gap="20" max align="center">
            {modalContent(cls.drawer)}

            <Button onClick={acceptHandle} max>
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  )
})
