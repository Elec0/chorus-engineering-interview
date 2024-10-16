export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  description?: string;
}

export interface Profile {
    id: number;
    name: string;
    pokemon: Pokemon[];
  }