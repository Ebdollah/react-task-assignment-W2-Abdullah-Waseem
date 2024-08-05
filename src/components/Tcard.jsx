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
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPeople(data.results);
        setFilteredPeople(data.results); // Initialize filteredPeople with the full list
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateData = () => {
      if (filter.length > 0) {
        const filteredItems = people.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPeople(filteredItems);
      } else {
        setFilteredPeople(people); // Reset to full list when filter is cleared
      }
    };
    updateData();
  }, [filter, people]); // Also depend on people to reset when data changes

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-600">Star Wars Characters</h1>
      <Filter onSet={setFilter} />
      <div className="">
        {filteredPeople.map((p) => (
          <Cardc key={p.name} peoples={p} />
        ))}
      </div>
    </div>
  );
};

export default Tcard;
