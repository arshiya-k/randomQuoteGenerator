import './App.css';
import React from 'react';
import Quotes from './components/quotes';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <Quotes/>
    </div>
  );
}

export default App;
