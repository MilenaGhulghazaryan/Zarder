import React from 'react';
import './App.css';
import Header from './components/header/Header';
import MaleFemale from './features/category/Category';
import SubCategory from './features/subCategory/SubCategory'
import AddImg from './features/addImg/AddImg';

function App() {
  return (
    <div className="App">
      <Header />
      <MaleFemale />
      <SubCategory />
      <AddImg />
    </div>
  );
}

export default App;
