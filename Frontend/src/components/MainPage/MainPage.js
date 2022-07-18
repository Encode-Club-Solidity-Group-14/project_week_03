import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import MainHeader from '../MainHeader/MainHeader';
function MainPage() {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Home/>
      </main>
    </React.Fragment>
  );
}

export default MainPage;
