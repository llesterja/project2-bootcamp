import React from "react";
import SearchBarWrapper from "./components/SearchBarWrapper";
import "./CSS/App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <SearchBarWrapper />
      </div>
    );
  }
}

export default App;
