import { Flex, FlexProps } from '../Flex/Flex'

type VStackProps = Omit<FlexProps, 'direction'> // Исключаю direction у FlexProps

export const VStack = (props: VStackProps) => {
  return <Flex direction="column" align="start" {...props} />
}
