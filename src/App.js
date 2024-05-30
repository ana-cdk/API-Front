// Imports
import logo from './logo.svg';
import './App.css';
import Contador from './components/Contador';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Header from './components/Header';

// Component
function App() {
  return (
    <>
      <BrowserRouter>

        <Header></Header>
        <hr/>
        <main>
          <AppRoutes />
        </main>
        <hr/>
        <footer>Feito na UTF</footer>

      </BrowserRouter>      
    </>
  );
}

// Export
export default App;
