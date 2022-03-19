import { Heading, Image, Link } from '@chakra-ui/react'
import images from 'assets'
import { PageWrap } from 'layouts'
import React from 'react'

const PageNotFound: React.FC = () => {
  return (
    <PageWrap
      title="Page Not Found"
      containerStyles={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Image src={images[404]} boxSize="20vw" />
      <Heading mt={5}>Page not found!</Heading>
      <Link href="/" color="green.400" mt={5}>
        Go Home...
      </Link>
    </PageWrap>
  )
}

export default PageNotFound
