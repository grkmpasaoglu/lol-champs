import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { GlobalContext,GlobalProvider } from './context/GlobalContext';
import { FooterProvider } from './context/FooterContext';

function App() {
  return (
      <div>
        <GlobalProvider>
          <Header/>
        </GlobalProvider>
        <FooterProvider>
          <Footer/>
        </FooterProvider>

      </div>
   
  );
}

export default App;
