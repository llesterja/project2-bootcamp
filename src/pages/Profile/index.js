import React, { useContext, useEffect, useState } from 'react';
import ChipForm from '../../components/Organisms/dashBoardform';
import loggedInContext from '../../utils/loggedInContext';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../../utils/useCurrentUser';
import { getProfilePictureURL } from '../../api/manageUserData';
import '../../CSS/Dashboard.css';
import DestinationGallery from '../../components/DestinationGallery';
import { getDatabase,get, child, ref, set, remove, onValue } from 'firebase/database';
import MUIloadingAnimation from '../../components/Atoms/MUIloadingAnimation';
import getAmadeusToken from '../../api/UseAmadeus';
import axios from 'axios';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn, profileImageURL, setProfileImageURL] =
    useContext(loggedInContext);
  const [homeCountry,setHomeCountry]= useState(null);
  const [homeAirport,setHomeAirport]= useState(null);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/register');
    }
  });

  useEffect(() => {
    const fetchProfilePictureURL = async () => {
      if (currentUser) {
        try {
          const url = await getProfilePictureURL(currentUser.uid);
          setProfileImageURL(url);
        } catch (error) {
          console.error('Error fetching profile picture URL:', error);
        }
        getHomeCountry();
      }
    };

    fetchProfilePictureURL();
  }, [currentUser, setProfileImageURL]);
    


    const getHomeCountry = () => {
      const db = getDatabase();
      const homeCountryRef = ref(db, `users/${currentUser.uid}`);
        get(child(homeCountryRef, `homeCountry`))
        .then((data) => {
          if (data.exists()) {
            console.log(data.val())
            setHomeCountry(data.val());
          }
        })
        .catch((error) => {
          console.error(error);
        });
      };

  const getAirport = async(city) => {

    try{
    const CitytoIATA = await axios.get(
      `https://api.api-ninjas.com/v1/airports?city=${city}`,
      {
        headers: {
          'X-API-Key': "WifvxIo9VN6OftjoVEb0ipwRCSQEY1fMYxJRC11h",
        }
      }
    );
    console.log('apininja:',CitytoIATA.data)
    console.log('apininja0:',CitytoIATA.data[0].iata)
    console.log('apininja1:',CitytoIATA.data[1].iata)
    console.log('apininja1:',CitytoIATA.data.length)

    for (let i of CitytoIATA.data){
      if (i.iata == ""){
        console.log(i)
        continue;
      }else if(i.iata) {
        setHomeAirport(i.iata);
      }else{
        console.log("No IATA found")
      }
    }
    console.log("home IATA:",homeAirport)
    } catch(err){
      console.log(err);
    };
  }
  useEffect(()=>{
    if(homeCountry){
      getAirport(homeCountry);}
  },[homeCountry]);

    if (!homeAirport) {
    return <MUIloadingAnimation />; // or any other loading state
  } 
  return (
    <>
    <div className="profile-container">
      <h1 style={{justifyContent:"center"}}>Profile Page</h1>
      <div className="profile">
        <div className="image-container">
          <img src={profileImageURL} alt={`profile for ${currentUser?.uid}`} />
        </div>
        <ChipForm />
      </div>
    </div>
    <div>
      <DestinationGallery origin = {homeAirport}/>        
    </div>

    </>
    
  );
};

export default Profile;
