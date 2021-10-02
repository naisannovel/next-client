import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

export const userInfoContext = createContext();

function App() {

  const [user,setUser] = useState({loading:false,userData:{},errMsg:null});

  return (
    <userInfoContext.Provider value={[user,setUser]}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </userInfoContext.Provider>
  );
}

export default App;
