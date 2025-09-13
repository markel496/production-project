import { Suspense } from 'react'

import { Modal } from '@/shared/ui/Modal'

import { Loader } from '@/shared/ui/Loader'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

import cls from './LoginModal.module.scss'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen, onClose } = props

  return (
    <Modal
      className={className}
      clsContent={cls.loginForm}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Suspense
        fallback={
          <div className={cls.loaderContainer}>
            <Loader />
          </div>
        }
      >
        <LoginFormAsync className={cls.loginForm} onSuccess={onClose} />
      </Suspense>
    </Modal>
  )
}
