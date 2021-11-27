import './App.css';
import { Fragment } from 'react';
import Splash from './components/Splash';
import Taleb from './components/Taleb'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';


// Constants
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

function App() {

   // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <Router>
      <Fragment>
          <Routes>
          <Route exact path='/' element={<Splash/>} />
          </Routes>
          <Routes>
          <Route exact path='/taleb' element={<Taleb/>} />
          </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
