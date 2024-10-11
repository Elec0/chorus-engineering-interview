import { Pokemon, Profile } from "./types";

export const fetchPokemon = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pokemon`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.map((pokemon: any) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    image: pokemon?.imageUrl, // Assuming the backend returns an imageUrl field
  }));
};

export const fetchProfiles = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profiles`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createProfile = async (name: string): Promise<Profile> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const deleteProfile = async (id: number): Promise<void> => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/profiles/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Fetches the Pokémon associated with a profile by ID.
 * 
 * Frontend expects a full pokemon object
 */
export const fetchProfilePokemon = async (id: number): Promise<Pokemon[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profiles/${id}/pokemon`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.map((pokemon: any) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    image: pokemon?.imageUrl, // Assuming the backend returns an imageUrl field
  }));

};

/**
 * Assigns a list of Pokémon to a profile by ID.
 */
export const assignPokemonToProfile = async (profileId: number, pokemonIds: number[]): Promise<void> => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/profiles/${profileId}/pokemon`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokemonIds),
  });
};