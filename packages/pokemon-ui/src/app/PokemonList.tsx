// packages/pokemon-ui/src/app/PokemonList.tsx
import React, { useEffect, useState } from 'react';
import { fetchPokemon } from "../services/api";

interface Pokemon {
  id: number;
  name: string;
}

const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon()
      .then((data: Pokemon[]) => setPokemon(data));
  }, []);

  return (
    <div>
      <h2>Pokémon List</h2>
      <ul>
        {pokemon.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;