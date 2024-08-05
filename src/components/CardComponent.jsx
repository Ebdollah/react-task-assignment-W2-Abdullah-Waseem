import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const CardComponent = ({ peoples }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [homeInfo, setHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name, height, mass, created, films, birth_year, homeworld, url } = peoples;

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const extractIdFromUrl = (url) => {
    const id = url.match(/\/(\d+)\/$/);
    return id ? id[1] : null;
  };

  const getCharacterImageUrl = (characterUrl) => {
    const characterId = extractIdFromUrl(characterUrl);
    if (characterId) {
      return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(homeworld);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setHomeInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [homeworld]); // Add homeworld as a dependency to refetch if it changes

  const getColorBySpecies = (species) => {
    // Dummy logic: you may want to fetch species data from API
    switch (species) {
      case 'Human':
        return 'bg-blue-200';
      case 'Droid':
        return 'bg-gray-300';
      default:
        return 'bg-green-200';
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`max-w-sm rounded overflow-hidden shadow-lg cursor-pointer ${getColorBySpecies(peoples.species?.name)}`}
      >
        <img
            className="w-full h-52 object-cover"
            src={getCharacterImageUrl(url)}
            alt={'wef'}
          />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">Explore the galaxy with {name}!</p>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-auto max-h-[80vh] overflow-auto">
            <h1 id="modal-title" className="text-3xl font-bold text-amber-950 mb-4">
              {name}
            </h1>
            <p>{height / 100} meters</p>
            <p>{mass} kg</p>
            <p>Created: {format(new Date(created), 'dd-MM-yyyy')}</p>
            <p>No of films: {films.length > 0 ? films.length : 'No films'}</p>
            <p>Birth Year: {birth_year}</p>
            <h1 className="text-3xl font-bold text-amber-950 mb-4">Home Info</h1>
            {loading ? (
              <p>Loading homeworld...</p>
            ) : error ? (
              <p>Error loading homeworld: {error.message}</p>
            ) : (
              homeInfo && (
                <>
                  <p>Home Name: {homeInfo.name}</p>
                  <p>Climate: {homeInfo.climate}</p>
                  <p>Terrain: {homeInfo.terrain}</p>
                  <p>No of Residents: {homeInfo.population}</p>
                </>
              )
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardComponent;
