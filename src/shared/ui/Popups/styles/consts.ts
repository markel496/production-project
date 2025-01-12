import { PopupPosition } from '@/shared/types/ui'
import cls from '../styles/Popups.module.scss'

export const mapPositionClasses: Record<PopupPosition, string> = {
  'bottom left': cls.bottomLeft,
  'bottom right': cls.bottomRight,
  'top left': cls.topLeft,
  'top right': cls.topRight
}
