// Imports
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';

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
        <Footer></Footer>

      </BrowserRouter>      
    </>
  );
}

// Export
export default App;
