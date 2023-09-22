import React, {useState} from "react";
import DatePicker from "./CalendarComponent";
import '../CSS/App.css'
import MyForm from "./DropDown";

const SearchBar = () => {
const [isTravelModelOpen, setIsTravelModelOpen]=useState(false)


const handleTravelToggle =(event)=>{
    event.preventDefault();
    setIsTravelModelOpen(!isTravelModelOpen)
}
  return (
    <div className="searchbar">
      <form>
        <label>From</label>
        <input name="departure" id="departure" placeholder="Country, City or Airport" />
        <label>To</label>
        <input name="arrival" id="arrival" placeholder="Country, City or Airport" />
        <DatePicker className="calendar-input" />
         <div className="toggle-menu">
         <button onClick={handleTravelToggle}>
            <span className="placeholder-text"> Travellers and cabin Class</span>
            <span className="option text"> 1 Adult, First Class</span>
         </button>
         </div>


        <button className="" type="submit">Search</button>
        <button className="" type="submit">Surprise Me</button>
      </form>
       {isTravelModelOpen&&<MyForm  className="passenger-type-accordian" />}
    </div>

  );
};

export default SearchBar;