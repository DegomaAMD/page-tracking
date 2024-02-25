import React, { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import logo from './logo.svg';
import Table from './components/Table.js'
import DataTable from './components/DataTable.js'
import './App.css';
import Vpn from './components/Vpn.js';

function App() {
  return (
 <>
 <Router>
  
  <Routes>
    <Route exact path='/hb88-1111' element={<Vpn/>}/>
    <Route exact path='/' element={<DataTable/>}/>
  </Routes>
 </Router>
 </>
  );
}

export default App;
