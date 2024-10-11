import React from 'react';
import PokemonList from "./PokemonList";
import ProfileSelection from "./ProfileSelection";
import "./app.css";

export function App() {
  return (
    <div className="app-container">
      <ProfileSelection />
      <PokemonList />
      {/* <TeamBuilder /> */}
    </div>
  );
}

export default App;