import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextProps {
  Spring?: SpringType
  Gesture?: GestureType
  isLoaded?: boolean // подгрузились библиотеки или нет
}

const AnimationContext = createContext<AnimationContextProps>({})

// Обе либы подгружаются параллельно
const getAsyncAnimationModules = async () =>
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')])

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextProps>
  // Явно скастовал результат выполнения контекста и сказал, что он вернет необходимые поля в обязателоьном порядке
}

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const SpringRef = useRef<SpringType>()
  const GestureRef = useRef<GestureType>()

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring
      GestureRef.current = Gesture
      setIsLoaded(true)
    })
  }, [])

  const value = useMemo(
    () => ({
      Spring: SpringRef.current,
      Gesture: GestureRef.current,
      isLoaded
    }),
    [isLoaded]
  )

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}
