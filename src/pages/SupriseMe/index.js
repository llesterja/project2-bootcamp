import React from 'react';
import DestinationGallery from "../../components/DestinationGallery";
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import Navbar from '../../components/Molecules/Navbar';
import { useSearchParams } from 'react-router-dom';



const SurpriseMePage = () => {
  let [searchParams] = useSearchParams();
  const origin = searchParams.get('origin')
  console.log("origin:",origin)
  return(
    <>
      <Navbar />
      <div className="search-container">
        <SearchBarWrapper />
      </div>
      <DestinationGallery origin ={origin} />
    </>
  )
};

export default SurpriseMePage;