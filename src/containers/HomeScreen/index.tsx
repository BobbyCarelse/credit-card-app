import { Flex, Heading, Link } from '@chakra-ui/react'
import { AddCard, Card } from 'components'
import { useCreditCardContext } from 'context/CardProvider'
import { PageWrap } from 'layouts'
import React from 'react'

const HomeScreen: React.FC = () => {
    const {cards} = useCreditCardContext()
   
    return <PageWrap title='Home Screen'>
            <Flex width='100%' p={5} justifyContent='flex-end' bg='green.400' mb={5}>
                <Link href='/banned-countries'>Update Banned Countries</Link>
            </Flex>
            <AddCard/>
            {cards?.length ? <Flex flexDirection='column' justifyContent='center' alignSelf='center'>
                {cards.map(card => <Card key={card.cardNumber} card={card}/>)}
            </Flex> : <Heading fontSize='lg' textAlign='center' m="20px auto">No Cards Found.</Heading>}
    </PageWrap>
}

export default HomeScreen