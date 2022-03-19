import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { useCreditCardContext } from 'context/CardProvider'
import React from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { PaymentInputsContainer } from 'react-payment-inputs'

export type EventType = React.ChangeEvent<HTMLInputElement>

const AddCard: React.FC = () => {
  const { addCard } = useCreditCardContext()

  const [cardNumber, setCardNumber] = React.useState('')
  const [expiryDate, setExpiryDate] = React.useState('')
  const [cvc, setCvc] = React.useState('')
  const [country, setCountry] = React.useState('')

  return (
    <Flex
      flexDirection="column"
      p={5}
      shadow="2xl"
      bg="white"
      borderRadius={20}
      m="5px auto"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontSize="lg" mb={5} textAlign="center">
        Add A New Card
      </Heading>
      <form>
        <CountryDropdown
          onChange={setCountry}
          value={country}
          defaultOptionLabel="Select Country of issue"
        />
        <PaymentInputsContainer>
          {/* @ts-ignore */}
          {({ meta, getCardNumberProps, getExpiryDateProps, getCVCProps }) => (
            <div>
              <Input
                {...getCardNumberProps({
                  onChange: (e: EventType) => setCardNumber(e.target.value)
                })}
                value={cardNumber}
                mt={5}
              />
              <Input
                {...getExpiryDateProps({
                  onChange: (e: EventType) => setExpiryDate(e.target.value)
                })}
                value={expiryDate}
                my={5}
              />
              <Input
                {...getCVCProps({ onChange: (e: EventType) => setCvc(e.target.value) })}
                value={cvc}
              />
              {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
            </div>
          )}
        </PaymentInputsContainer>
      </form>
      <Button
        onClick={() => addCard && addCard({ cardNumber, cvc, expiryDate }, country)}
        colorScheme="blue"
        mt={5}
      >
        Add Card
      </Button>
    </Flex>
  )
}

export default AddCard
