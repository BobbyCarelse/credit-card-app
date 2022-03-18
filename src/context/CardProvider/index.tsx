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
}

const CreditCardContext = React.createContext<Partial<CreditCardProviderProps>>({})

const BANNED_COUNTRIES = ['SOMALIA', 'TAIWAN']

export const useCreditCardContext = (): Partial<CreditCardProviderProps> => React.useContext(CreditCardContext)

export const PERSIST_KEYWORD = 'PersistCard'

const CreditCardProvider: React.FC = ({ children }) => {
  const toast = useToast()
  const [cards, setCards] = React.useState<CardType[]>([])


  React.useEffect(() => {
    const response = sessionStorage.getItem(PERSIST_KEYWORD)
     if(response){
       const payload = JSON.parse(response)
        setCards(payload)
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

    if(BANNED_COUNTRIES.includes(country.toUpperCase())){
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

  return (
    <CreditCardContext.Provider
      value={{
        cards,
        addCard,
        removeCard
      }}
    >
      {children}
    </CreditCardContext.Provider>
  )
}

export default CreditCardProvider
