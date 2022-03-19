import { Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import { AiFillProject } from 'react-icons/ai'

type BasicNavProps = {
  title: string
  navItems: [{ title: string; href: string }]
}

const BasicNav: React.FC<BasicNavProps> = ({ navItems, title }) => {
  return (
    <Flex
      width="100%"
      p={5}
      justifyContent="space-between"
      alignItems="center"
      bg="green.400"
      mb={5}
    >
      <Flex flex={0.3}>
        {' '}
        <AiFillProject color="white" size={20} />
      </Flex>
      <Flex flex={1} justifyContent="center">
        <Heading fontSize="2xl" color="white" textAlign="center">
          {title}
        </Heading>
      </Flex>
      <Flex flex={0.3} justifyContent="flex-end">
        {navItems.map((navItem) => (
          <Link
            key={navItem.title}
            href={navItem.href}
            textDecoration="none"
            color="white"
            fontWeight="600"
            _hover={{ color: 'blue.200' }}
          >
            {navItem.title}
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}

export default BasicNav
