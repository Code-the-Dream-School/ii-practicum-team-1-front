import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { AuthProvider } from './context/AuthContext';
import AppRouter from '../src/components/Router';

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
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );

}

export default App