import { Button, Flex, Grid, Heading, IconButton, Link, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import { useCreditCardContext } from 'context/CardProvider'
import { PageWrap } from 'layouts'
import React from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { ImBin } from 'react-icons/im'

const BannedCountriesScreen: React.FC = () => {
    const {countries, updateCountries} = useCreditCardContext()
    const [show, setShow] = React.useState(false)
    const [country, setCountry] = React.useState('')

    const addCountry = () => {
        if(countries && !countries.includes(country)){
            updateCountries && updateCountries([...countries, country])
        }
    }
   
    return <PageWrap title='Banned Countries'>
        <Flex width='100%' p={5} justifyContent='flex-end' bg='green.400' mb={5}>
                <Link href='/'>Manage my cards</Link>
            </Flex>
        {countries?.length ?<Grid templateColumns='repeat(5, 1fr)' gap={6}>
            { countries?.map(country => <Flex p={2} key={country} alignItems='center'>
                <Text mr={2}>{country}</Text>
                <IconButton aria-label='Remove Country' icon={<ImBin size={15} color='black'/>} onClick={() => updateCountries && updateCountries(countries.filter(el => el !== country))}/>
            </Flex>)} 
        </Grid>:<Flex flexDirection='column' width='100%' justifyContent='center' alignItems='center' p={5}>
                    <Heading fontSize='lg' textAlign='center' mb={5}>You Currently don't have any countries banned.</Heading>
                    <Button onClick={() => setShow(true)} colorScheme='blue'>Add A Country</Button>
                </Flex> }

        <Modal isOpen={show} onClose={() => setShow(false)}>
                <ModalOverlay/>
                <ModalContent bg='white' p={10}>
                    <Text mb={5}>Please Select A Country That you'd like to ban</Text>
                    <CountryDropdown onChange={setCountry} value={country} defaultOptionLabel='Select Country to Ban'/>
                    {country && <Button onClick={addCountry} mt={5}>{`Add ${country} to your list`}</Button>}
                </ModalContent>
        </Modal>
    </PageWrap>
}

export default BannedCountriesScreen