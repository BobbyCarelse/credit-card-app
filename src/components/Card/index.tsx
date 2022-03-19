import { Flex, IconButton, Text } from '@chakra-ui/react'
import { CardType, useCreditCardContext } from 'context/CardProvider'
import React from 'react'
import { ImBin } from 'react-icons/im'

type CardProps = {
  card: CardType
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { removeCard } = useCreditCardContext()

  const lastFour = React.useMemo(() => card.cardNumber.slice(-4), [card])

  return (
    <Flex p={5} shadow="2xl" bg="white" borderRadius={20} m="5px auto" alignItems="center">
      <Flex flexDirection="column" mr={5}>
        <Text>{`Card Number: ${lastFour.padStart(card.cardNumber.length, '*')}`}</Text>
        <Text>{`Expiry Date: ${card.expiryDate}`}</Text>
      </Flex>
      <IconButton
        aria-label="Remove Card"
        icon={<ImBin size={30} color="black" />}
        onClick={() => removeCard && removeCard(card)}
      />
    </Flex>
  )
}

export default Card
