import React, { useState, useEffect,useMemo } from 'react';
import Cardc from './Cardc';
import Filter from './Filter';

const Tcarda = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [error, setError] = useState(null);

    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);
      
        useEffect(() => {
          const handler = setTimeout(() => {
            setDebouncedValue(value);
          }, delay);
      
          return () => {
            clearTimeout(handler);
          };
        }, [value, delay]);
      
        return debouncedValue;
      }
  
    const debouncedFilter = useDebounce(filter, 300); // Debounce the filter input by 300ms
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://swapi.dev/api/people/');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPeople(data.results);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const filteredPeople = useMemo(() => {
      if (debouncedFilter.length > 0) {
        return people.filter((p) =>
          p.name.toLowerCase().includes(debouncedFilter.toLowerCase())
        );
      }
      return people;
    }, [debouncedFilter, people]);
  
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

export default Tcarda;
