import React, { useState, useEffect } from 'react';

const CardComponent = ({ image, peoples }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {name, height, mass, created, films, birth_year, homeworld} = peoples;
  const [homeInfo, setHomeInfo] = useState();

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(()=>{
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
  },[])

  return (
    <>
      <div onClick={handleCardClick} className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer">
        <img className="w-full h-52 object-cover" src={image} alt={name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">Explore the galaxy with {name}!</p>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-auto max-h-[80vh] overflow-auto">
            {/* <img className="w-full h-52 object-cover" src={image} alt={name} /> */}
            <h1 className="text-3xl font-bold text-amber-950 mb-4">{name}</h1>
            <p>{height} meters</p>
            <p>{mass} kg</p>
            <p>Created: {created}</p>
            <p>No of films: {films.length>0 ? films.length : 'No films'}</p>
            <p>Birth Year is: {birth_year}</p>
            <h1 className="text-3xl font-bold text-amber-950 mb-4">Home Info</h1>
            <p>Home Name: {homeInfo.name}</p>
            <p>Climate is: {homeInfo.climate}</p>
            <p>Terrain is: {homeInfo.terrain}</p>
            <p>No of Residents: {homeInfo.population}</p>
            {/* <p className="text-gray-700 text-base mb-6">Explore the galaxy with {name}!</p> */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
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
