import { Flex, FlexProps } from '@chakra-ui/react'
import * as React from 'react'
import { Helmet } from 'react-helmet'

type PageWrapProps = {
  title: string
  hasWaves?: boolean
  containerStyles?: FlexProps
}

const PageWrap: React.FC<PageWrapProps> = ({ children, title, containerStyles }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        width="100vw"
        height="100vh"
        overflow="hidden"
        {...containerStyles}
      >
        {children}
      </Flex>
    </>
  )
}

export default PageWrap
