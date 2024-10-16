import React, { useEffect, useState } from 'react';
import { fetchPokemon } from '../services/api';
import PokemonCard from './PokemonCard';
import { Pokemon } from "../services/types";
import '../assets/styles.css';
import PokemonCardInfo from './PokemonCardInfo';

interface PokemonListProps {
  onPokemonSelect: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onPokemonSelect }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const onPokemonInfo = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };


  useEffect(() => {
    fetchPokemon().then((data: Pokemon[]) => setPokemon(data));
  }, []);

  return (
    <div>
      <h2>Pokémon List</h2>
      <div className="pokemon-list">
        {pokemon.map(p => (
          // <div key={p.id} onClick={() => onPokemonSelect(p)}>
          <div key={p.id}>
            <PokemonCard
              key={p.id}
              id={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
              onAddClick={() => onPokemonSelect(p)}
              onInfoClick={() => onPokemonInfo(p)}
            />
          </div>
        ))}
      </div>
      <PokemonCardInfo pokemon={selectedPokemon} onClose={closeModal} />
    </div>
  );
};

export default PokemonList;