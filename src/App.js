import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { isAuthenticated } from './utilities/authUtilities';

export const userInfoContext = createContext();
export const myPostContext = createContext();

function App() {

  const [user,setUser] = useState({loading:false,userData:{},errMsg:null});
  const [myPost,setMyPost] = useState({ post: [], loading: false })

  useEffect(()=> isAuthenticated((data)=>setUser({...user,userData: data})) ,[]);
  return (
    <userInfoContext.Provider value={[user,setUser]}>
      <myPostContext.Provider value={[myPost,setMyPost]}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </myPostContext.Provider>
    </userInfoContext.Provider>
  );
}

export default App;
