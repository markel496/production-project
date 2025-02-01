import { Modal } from '@/shared/ui/Modal/Modal'
import { Suspense } from 'react'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import { Loader } from '@/shared/ui/Loader/Loader'

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
