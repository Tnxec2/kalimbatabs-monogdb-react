// src/App.tsx
import { AuthProvider } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation';
import Home from './pages/Home';
import { RestApiProvider } from './context/RestApiContext';

export function App() {
  
  return (
    <AuthProvider>
      <RestApiProvider>
        <Navigation />
        <Home />
      </RestApiProvider>
    </AuthProvider>
  );
}