import React from 'react';
import '../assets/styles.css';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  image: string;
  onAddClick?: () => void;
  onInfoClick?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, image, onAddClick, onInfoClick }) => {
  return (
    <div className="pokemon-card">
      {onInfoClick && <input type="button" value="Show more info" onClick={onInfoClick} />}
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Types: {types.join(', ')}</p>
      {onAddClick && <input type="button" value="Add to team" onClick={onAddClick} />}
    </div>
  );
};

export default PokemonCard;