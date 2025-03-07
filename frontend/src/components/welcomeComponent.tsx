import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Flex, Spinner } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';

const WelcomeComponent: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/qoutes');
      setQuote(response.data.quoteText);
      setAuthor(response.data.quoteAuthor);
      setShowContent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Box
      backgroundImage="url(../../public/books.jpg)"
      backgroundSize="cover"
      backgroundPosition="center"
      width="50%"
      minHeight="84.5vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        color="white"
        zIndex={1}
        p={4}
      >
        <Heading
          as="h1"
          size="2xl"
          mb={6}
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
        >
          Welcome to the Leselounge
        </Heading>

        {isLoading ? (
          <Spinner size="xl" color="white" />
        ) : (
          <Fade triggerOnce key={`${quote}-${author}`}>
            <Heading
              as="h2"
              size="lg"
              maxWidth="800px"
              lineHeight="1.6"
              fontStyle="italic"
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
            >
              "{quote}"
            </Heading>
            <Heading
              as="h3"
              size="md"
              mt={4}
              fontWeight="semibold"
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)"
            >
              – {author}
            </Heading>
          </Fade>
        )}
      </Flex>
    </Box>
  );
};

export default WelcomeComponent;