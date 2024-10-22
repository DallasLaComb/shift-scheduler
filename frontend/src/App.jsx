import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [number, setNumber] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL; // Correct way to access env vars in Vite
  // Fetch the number from the backend when the app loads
  useEffect(() => {
    axios.get(`${apiUrl}/number`)
      .then(response => {
        setNumber(response.data.num);
      })
      .catch(error => console.error('Error fetching the number:', error));
  }, [apiUrl]);

  // Increment the number
  const incrementNumber = () => {
    axios.post(`${apiUrl}/increment`)
      .then(() => {
        setNumber(prevNumber => prevNumber + 1);
      })
      .catch(error => console.error('Error incrementing the number:', error));
  };

  // Decrement the number
  const decrementNumber = () => {
    axios.post(`${apiUrl}/decrement`)
      .then(() => {
        setNumber(prevNumber => prevNumber - 1);
      })
      .catch(error => console.error('Error decrementing the number:', error));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{number}</h1>
      <button onClick={incrementNumber}>+</button>
      <button onClick={decrementNumber}>-</button>
    </div>
  );
}

export default App;
