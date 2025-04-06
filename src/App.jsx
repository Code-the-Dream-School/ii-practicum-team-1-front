import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import AppRouter from '../src/components/Router';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "../context/AuthContext";
import { PostsProvider } from "../context/PostsContext";

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <PostsProvider>
          <AppRouter />
        </PostsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );

}

export default App