import React, { useEffect, useState } from 'react';
import { fetchPokemon } from '../services/api';
import PokemonCard from './PokemonCard';
import { Pokemon } from "../services/types";
import '../assets/styles.css';

interface PokemonListProps {
  onPokemonSelect: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onPokemonSelect }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon().then((data: Pokemon[]) => setPokemon(data));
  }, []);

  return (
    <div>
      <h2>Pokémon List</h2>
      <div className="pokemon-list">
        {pokemon.map(p => (
          <div key={p.id} onClick={() => onPokemonSelect(p)}>
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;