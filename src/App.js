import React from "react";
import "./App.css";
import DestinationCard from "./components/DestinationCard";
import DestinationGallery from "./components/DestinationGallery"


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Component Testing

            <DestinationGallery/>

        </header>
      </div>
    );
  }
}

export default App;
