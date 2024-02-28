import React, { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import DataTable from './components/DataTable.js'
import './App.css';
import Vpn from './components/Vpn.js';

function App() {
  return (
 <>
 <Router>
  
  <Routes>

    <Route exact path='/' element={<Vpn/>}/>
    <Route exact path='/dashboard' element={<DataTable/>}/>
  </Routes>
 </Router>
 </>
  );
}

export default App;
