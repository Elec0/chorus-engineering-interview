import React from 'react';
import "./PokemonCard.css";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Types: {types.join(', ')}</p>
    </div>
  );
};

export default PokemonCard;