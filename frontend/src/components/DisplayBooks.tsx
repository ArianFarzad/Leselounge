import UsersLibrary from "./UsersLibrary";
import { Accordion, Span } from "@chakra-ui/react";

const DisplayBooks: React.FC = () => {
  const userId = localStorage.getItem('userId');

  return (
    <Accordion.Root collapsible defaultValue={['my-bookshelf']}>
      <Accordion.Item value="my-bookshelf">
        <Accordion.ItemTrigger>
          <Span flex="1" fontSize={'1.5em'} textAlign={'left'} color={'gray.900'}>My Bookshelf</Span>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <UsersLibrary userId={userId} />
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default DisplayBooks;