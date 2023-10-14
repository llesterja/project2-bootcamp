import React from 'react';
import DestinationGallery from '../../components/DestinationGallery';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';

function SurpriseMe() {
  return (
    <>
      <div className="search-container">
        <SearchBarWrapper />
      </div>
      <DestinationGallery />
    </>
  );
}

const SurpriseMePage = () => {
  return (
    <>
      <div className="search-container">
        <SearchBarWrapper />
      </div>
      <DestinationGallery />
    </>
  );
};

export default SurpriseMePage;
