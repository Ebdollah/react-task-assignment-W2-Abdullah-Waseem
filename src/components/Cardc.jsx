import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AiOutlineRight } from 'react-icons/ai';

const Cardc = ({ peoples }) => {
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
        className={`flex m-5 p-2 rounded-lg overflow-hidden shadow-lg cursor-pointer ${getColorBySpecies(peoples.species?.name)}`}
      >
        <img
          className="w-16 h-16 ml-2 mt-4 rounded-2xl border border-gray-300 shadow-md"
          src={getCharacterImageUrl(url)}
          alt={'wef'}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">Explore the galaxy with {name}!</p>
        </div>
        <AiOutlineRight className="ml-auto mr-4 my-auto text-gray-500" />
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="bg-white p-8 rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-auto max-h-[80vh] overflow-auto">
            <div className="mb-4">
              <h1 id="modal-title" className="text-4xl font-extrabold text-blue-600 mb-2">{name}</h1>
              <p className="text-lg text-gray-600 mb-4">{height / 100} meters | {mass} kg</p>
              <div className="flex flex-wrap mb-4">
                <div className="mr-4 mb-2">
                  <span className="block font-semibold text-sm text-gray-500">Created:</span>
                  <span className="text-base text-gray-700">{format(new Date(created), 'dd-MM-yyyy')}</span>
                </div>
                <div className="mr-4 mb-2">
                  <span className="block font-semibold text-sm text-gray-500">No of films:</span>
                  <span className="text-base text-gray-700">{films.length > 0 ? films.length : 'No films'}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-semibold text-sm text-gray-500">Birth Year:</span>
                  <span className="text-base text-gray-700">{birth_year}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-amber-600 mb-4">Home Info</h2>
              {loading ? (
                <p className="text-gray-500">Loading homeworld...</p>
              ) : error ? (
                <p className="text-red-500">Error loading homeworld: {error.message}</p>
              ) : (
                homeInfo && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block font-semibold text-sm text-gray-500">Home Name:</span>
                      <span className="text-base text-gray-700">{homeInfo.name}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-sm text-gray-500">Climate:</span>
                      <span className="text-base text-gray-700">{homeInfo.climate}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-sm text-gray-500">Terrain:</span>
                      <span className="text-base text-gray-700">{homeInfo.terrain}</span>
                    </div>
                    <div>
                      <span className="block font-semibold text-sm text-gray-500">Population:</span>
                      <span className="text-base text-gray-700">{homeInfo.population}</span>
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 mt-4"
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

export default Cardc;
