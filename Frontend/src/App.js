import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import MainPage from './components/MainPage/MainPage';
import List from './components/List/List';
import Add from './components/Add/Add';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/create" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        </Routes>
      </Router>
      
    </QueryClientProvider>
  );
}

export default App;
