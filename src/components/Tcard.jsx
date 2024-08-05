import React, { useState, useEffect } from 'react';
// import CardComponent from './CardComponent';
import Cardc from './Cardc';

const Tcard = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.results);
        setPeople(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">Error: {error.message}</div>;

  return ( 
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-600">Star Wars Characters</h1>
      <div className="">
        {people.map((p) => (
          <Cardc key={p.name} peoples={p} />
        ))}
      </div>
    </div>
  );
};

export default Tcard;
