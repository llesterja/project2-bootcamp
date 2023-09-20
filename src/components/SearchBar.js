import React, {useState} from "react";
import Calendar from "./CalendarComponent";
import '../CSS/App.css'

const SearchBar = () => {


  return (
    <div className="searchbar">
      <form>
        <label>From</label>
        <input name="departure" id="departure" placeholder="Country, City or airport" />
        <label>To</label>
        <input name="arrival" id="arrival" placeholder="Country, City or airport" />
        <Calendar/>
        <button className="" type="submit">Search</button>
        <button className="" type="submit">Surprise Me</button>
      </form>
    </div>
  );
};

export default SearchBar;