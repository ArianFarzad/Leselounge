import { HStack, RadioCard } from "@chakra-ui/react"

interface CostumRadioCardProps {
  items: { value: string, title: string }[]
}

const CostumeRadioCard: React.FC<CostumRadioCardProps> = ({ items }) => {
  return (
    <RadioCard.Root defaultValue="next">
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

export default CostumeRadioCard;
