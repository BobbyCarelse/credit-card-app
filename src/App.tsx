import { ChakraProvider, theme } from '@chakra-ui/react'
import { CardProvider } from 'context'
import Navigation from 'navigation'
import * as React from 'react'

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <CardProvider>
      <Navigation />
    </CardProvider>
  </ChakraProvider>
)
