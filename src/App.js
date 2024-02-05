import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Wrong from './Wrong'; 
import Validation from './Validation';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/wrong" element={<Wrong />} />
        <Route path="/validation" element={<Validation />} />
        
      </Routes>
    </Router>
  );
}

export default App;
