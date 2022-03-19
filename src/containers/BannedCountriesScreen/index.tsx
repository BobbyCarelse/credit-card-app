import {
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react'
import { BasicNav } from 'components'
import { useCreditCardContext } from 'context/CardProvider'
import { PageWrap } from 'layouts'
import React from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { ImBin } from 'react-icons/im'

const BannedCountriesScreen: React.FC = () => {
  const toast = useToast()
  const { countries, updateCountries } = useCreditCardContext()
  const [show, setShow] = React.useState(false)
  const [country, setCountry] = React.useState('')

  const addCountry = () => {
    if (countries && !countries.includes(country)) {
      updateCountries && updateCountries([...countries, country])
      toast({ description: `Add ${country} to list of banned countries`, status: 'info' })
    }
  }

  return (
    <PageWrap title="Banned Countries">
      <BasicNav title="Banned Countries" navItems={[{ title: 'Manage my cards', href: '/' }]} />
      <Flex flexDirection="column" width="100%" justifyContent="center" alignItems="center" p={5}>
        <Button onClick={() => setShow(true)} colorScheme="blue">
          Add A Country
        </Button>
      </Flex>
      {countries?.length ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={6} m="20px auto" p={5}>
          {countries?.map((country) => (
            <Flex width="100%" p={2} key={country} alignItems="center" justifyContent="center">
              <Text mr={2}>{country}</Text>
              <IconButton
                aria-label="Remove Country"
                icon={<ImBin size={15} color="black" />}
                onClick={() =>
                  updateCountries && updateCountries(countries.filter((el) => el !== country))
                }
              />
            </Flex>
          ))}
        </Grid>
      ) : (
        <Heading fontSize="lg" textAlign="center" m="10px auto">
          You Currently don't have any countries banned.
        </Heading>
      )}
      <Modal
        isOpen={show}
        onClose={() => {
          setShow(false)
          setCountry('')
        }}
      >
        <ModalOverlay />
        <ModalContent bg="white" p={10}>
          <Text mb={5}>Please Select A Country That you'd like to ban</Text>
          <CountryDropdown
            onChange={setCountry}
            value={country}
            defaultOptionLabel="Select Country to Ban"
          />
          {country && (
            <Button
              onClick={addCountry}
              mt={5}
              isTruncated
              textAlign="start"
            >{`Add to your list`}</Button>
          )}
        </ModalContent>
      </Modal>
    </PageWrap>
  )
}

export default BannedCountriesScreen
