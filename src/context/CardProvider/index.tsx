import { useToast } from '@chakra-ui/react'
import * as React from 'react'

export type CardType = {
    cardNumber: string
    cvc: string
    expiryDate: string
}

type CreditCardProviderProps = {
  cards: CardType[],
  addCard: (card: CardType, country: string) => void,
  removeCard: (card: CardType) => void
  countries: string[]
  updateCountries: (countries: string[]) => void
}

const CreditCardContext = React.createContext<Partial<CreditCardProviderProps>>({})

export const useCreditCardContext = (): Partial<CreditCardProviderProps> => React.useContext(CreditCardContext)

export const PERSIST_KEYWORD = 'PersistCard'
const BANNED_KEYWORD = 'banned_countries'

const CreditCardProvider: React.FC = ({ children }) => {
  const toast = useToast()
  const [cards, setCards] = React.useState<CardType[]>([])
  const [bannedCountries, setBannedCountries] = React.useState<string[]>([])


  React.useEffect(() => {
    const response = sessionStorage.getItem(PERSIST_KEYWORD)
     if(response){
       const payload = JSON.parse(response)
        setCards(payload)
     }
     const countriesResponse = localStorage.getItem(BANNED_KEYWORD)
     if(countriesResponse){
      setBannedCountries(JSON.parse(countriesResponse))
     }
  }, []) 

  React.useEffect(() => {
      sessionStorage.setItem(PERSIST_KEYWORD, JSON.stringify(cards))
  }, [cards])

  const addCard = (card: CardType, country: string) => {
    if(!country.length){
      toast({description: "Please select your country off issue", status: 'error'})
      return 
    }

    if(bannedCountries.includes(country.toUpperCase())){
      toast({description: `Cards from ${country} are banned.`, status: 'error'})
      return 
    }

    const cardExist = cards.find(el => el.cardNumber === card.cardNumber)

    if(cardExist){
        toast({description: 'Card has already been saved.', status: 'error'})
        return
    }

    setCards(previousCards => [...previousCards, card])
  }

  const removeCard = (card: CardType) => {
    setCards(previousCards => previousCards.filter(el => el.cardNumber !== card.cardNumber))
  }

  const updateCountries = (countries: string[]) => {
    setBannedCountries(countries)
    console.log(countries)
    localStorage.setItem(BANNED_KEYWORD, JSON.stringify(countries))
  }

  return (
    <CreditCardContext.Provider
      value={{
        cards,
        addCard,
        removeCard,
        countries: bannedCountries,
        updateCountries
      }}
    >
      {children}
    </CreditCardContext.Provider>
  )
}

export default CreditCardProvider
