import './App.css';
import { Fragment } from 'react';
import Footer from './components/Footer';
import Floki from './components/Floki';
import Taleb from './components/Taleb'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Fragment>
          <Routes>
          <Route exact path='/' element={<Floki/>} />
          </Routes>
          <Routes>
          <Route exact path='/taleb' element={<Taleb/>} />
          </Routes>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
