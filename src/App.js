import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LolApi from './components/LolApi';
import ChampionDetail from './components/ChampionDetail';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LolApi />} />
        <Route path="/:championName" element={<ChampionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
