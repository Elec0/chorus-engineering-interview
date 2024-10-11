/**
 * This exists to make clear the distinction between the DTO and the database entity.
 */
export interface CreatePokemonDto {
  id: number;
  name: string;
  types: string[];
  imageUrl?: string; // Optional field
}