// packages/pokemon-ui/src/app/app.tsx
import React from 'react';
import PokemonList from "./PokemonList";
// import ProfileSelection from "./ProfileSelection";
// import TeamBuilder from "./TeamBuilder";

export function App() {
  return (
    <div>
      {/* <ProfileSelection /> */}
      <PokemonList />
      {/* <TeamBuilder /> */}
    </div>
  );
}

export default App;