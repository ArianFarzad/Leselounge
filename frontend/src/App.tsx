// In App.js:
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '@/components/Register.tsx';
import { Provider } from '@/components/ui/provider';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;