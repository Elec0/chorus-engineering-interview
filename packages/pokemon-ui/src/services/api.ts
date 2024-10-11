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