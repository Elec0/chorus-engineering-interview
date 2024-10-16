// packages/pokemon-ui/src/components/PokemonCardInfo.tsx
import React from 'react';
import { Pokemon } from '../services/types';
import '../assets/styles.css';

interface PokemonCardInfoProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

const PokemonCardInfo: React.FC<PokemonCardInfoProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;
  pokemon.description = pokemon.description || 'No description available.';

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} />
        <p>Types: {pokemon.types.join(', ')}</p>
        <p>Description: {pokemon.description}</p>
      </div>
    </div>
  );
};

export default PokemonCardInfo;