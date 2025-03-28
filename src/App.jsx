import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import AppRouter from './Router';

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
    <>
      <h1>{message}</h1>
      
      <AppRouter />
    </>
  );

}

export default App
