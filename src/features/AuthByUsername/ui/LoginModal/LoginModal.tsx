import { Suspense } from 'react'

import { Modal } from '@/shared/ui/Modal'

import { Loader } from '@/shared/ui/Loader'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'


interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen, onClose } = props

  return (
    <Modal className={className} isOpen={isOpen} onClose={onClose}>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  )
}
