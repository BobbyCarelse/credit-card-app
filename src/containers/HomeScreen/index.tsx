import { Flex, Heading } from '@chakra-ui/react'
import { AddCard, BasicNav, Card } from 'components'
import { useCreditCardContext } from 'context/CardProvider'
import { PageWrap } from 'layouts'
import React from 'react'

const HomeScreen: React.FC = () => {
  const { cards } = useCreditCardContext()

  return (
    <PageWrap title="Card Management">
      <BasicNav
        title="Card Management"
        navItems={[{ title: 'Update Banned Countries', href: '/banned-countries' }]}
      />
      <AddCard />
      {cards?.length ? (
        <Flex flexDirection="column" justifyContent="center" alignSelf="center">
          {cards.map((card) => (
            <Card key={card.cardNumber} card={card} />
          ))}
        </Flex>
      ) : (
        <Heading fontSize="lg" textAlign="center" m="20px auto">
          No Cards Found.
        </Heading>
      )}
    </PageWrap>
  )
}

export default HomeScreen
