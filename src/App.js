import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { isAuthenticated } from './utilities/authUtilities';

export const userInfoContext = createContext();
export const myPostContext = createContext();

function App() {

  const [user,setUser] = useState({loading:false,userData:{},errMsg:null});

  useEffect(()=> isAuthenticated((data)=>setUser({...user,userData: data})) ,[]);
  return (
    <userInfoContext.Provider value={[user,setUser]}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
    </userInfoContext.Provider>
  );
}

export default App;
