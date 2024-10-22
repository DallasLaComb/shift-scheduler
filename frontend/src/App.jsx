import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [number, setNumber] = useState(0);

  // Fetch the number from the backend when the app loads
  useEffect(() => {
    axios.get('http://localhost:5000/number')
      .then(response => {
        setNumber(response.data.num);
      })
      .catch(error => console.error('Error fetching the number:', error));
  }, []);

  // Increment the number
  const incrementNumber = () => {
    axios.post('http://localhost:5000/increment')
      .then(() => {
        setNumber(prevNumber => prevNumber + 1);
      })
      .catch(error => console.error('Error incrementing the number:', error));
  };

  // Decrement the number
  const decrementNumber = () => {
    axios.post('http://localhost:5000/decrement')
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
