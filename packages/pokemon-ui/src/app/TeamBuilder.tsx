import React, { useEffect, useState } from 'react';
import { fetchPokemon, assignPokemonToProfile } from '../services/api';
import { Pokemon } from '../services/types';
import PokemonList from "./PokemonList";
import PokemonCard from "./PokemonCard";
import '../assets/styles.css';

interface TeamBuilderProps {
  profileId: number;
  profilePokemon: Pokemon[];
  setProfilePokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ profileId, profilePokemon, setProfilePokemon }) => {

  const addPokemonToProfile = (pokemon: Pokemon) => {
    if (profilePokemon.length < 6 && !profilePokemon.some(p => p.id === pokemon.id)) {
      const updatedPokemon = [...profilePokemon, pokemon];
      assignPokemonToProfile(profileId, updatedPokemon.map(p => p.id)).then(() => {
        setProfilePokemon(updatedPokemon);
      });
    }
  };

  const removePokemonFromProfile = (pokemonId: number) => {
    const updatedPokemon = profilePokemon.filter(p => p.id !== pokemonId);
    assignPokemonToProfile(profileId, updatedPokemon.map(p => p.id)).then(() => {
      setProfilePokemon(updatedPokemon);
    });
  };

  return (
    <div className="team-builder">
      <h2>Build Your Team</h2>
      <h3>Selected Pokémon</h3>
      <div className="pokemon-list">
        {profilePokemon.map(p => (
          <div key={p.id}>
            <PokemonCard
              id={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
            />
            <button className="remove" onClick={() => removePokemonFromProfile(p.id)}>Remove</button>
          </div>
        ))}
      </div>

      <PokemonList onPokemonSelect={addPokemonToProfile} />
    </div>
  );
};

export default TeamBuilder;