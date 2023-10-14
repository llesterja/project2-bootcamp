import React from 'react';
import DestinationGallery from "../../components/DestinationGallery";
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import Navbar from '../../components/Molecules/Navbar';


function SurpriseMe(){

  return(
    <>

      <div className="search-container">
        <SearchBarWrapper />
      </div>
      <DestinationGallery />
    </>
  )
}

const SurpriseMePage = () => {
  return(
    <>
      <Navbar />
      <div className="search-container">
        <SearchBarWrapper />
      </div>
      <DestinationGallery />
    </>
  )
};

export default SurpriseMePage;