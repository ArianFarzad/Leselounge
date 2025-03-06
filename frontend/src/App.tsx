import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'; // Korrekte Imports
import Register from './components/Register';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
