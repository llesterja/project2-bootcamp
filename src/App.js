import React from "react";
import "./App.css";
import DestinationCard from "./components/DestinationCard";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Component Testing

            <DestinationCard/>

        </header>
      </div>
    );
  }
}

export default App;
