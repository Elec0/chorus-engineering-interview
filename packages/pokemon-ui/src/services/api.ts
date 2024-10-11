import { Profile } from "./types";

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