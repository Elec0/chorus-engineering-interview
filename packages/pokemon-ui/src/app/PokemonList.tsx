import React, { useEffect, useState } from 'react';
import { fetchPokemon } from '../services/api';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon().then((data: Pokemon[]) => setPokemon(data));
  }, []);

  return (
    <div>
      <h2>Pokémon List</h2>
      <div className="pokemon-list">
        {pokemon.map(p => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            types={p.types}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;