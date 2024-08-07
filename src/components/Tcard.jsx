import React, { useState, useEffect } from 'react';
import Cardc from './Cardc';
import Filter from './Filter';

const Tcard = () => {
  const [people, setPeople] = useState([]); // Full list
  const [filteredPeople, setFilteredPeople] = useState([]); // Filtered list
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      let allPeople = [];
      let nextPageUrl = 'https://swapi.dev/api/people/';

      while (nextPageUrl) {
        try {
          const response = await fetch(nextPageUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          allPeople = [...allPeople, ...data.results];
          nextPageUrl = data.next;
        } catch (error) {
          setError(error);
          break;
        }
      }

      setPeople(allPeople);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const updateData = () => {
      if (filter.length > 0) {
        const filteredItems = people.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPeople(filteredItems);
      } else {
        setFilteredPeople(people); 
      }
    };
    updateData();
  }, [filter, people]);

  if (loading) return <div className="text-center mt-8 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Star Wars Characters</h1>
      <Filter onSet={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredPeople.map((p) => (
          <Cardc key={p.name} peoples={p} />
        ))}
      </div>
    </div>
  );
};

export default Tcard;
