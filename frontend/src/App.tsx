// In App.js:
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { Provider } from '@/components/ui/provider';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
