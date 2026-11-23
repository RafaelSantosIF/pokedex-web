import { MOCK_POKEMON } from "./mock";

// true  = uses the data saved in mock.ts (works without internet)
// false = uses the real PokéAPI
export const USE_MOCK = false;

const BASE_URL = "https://pokeapi.co/api/v2";

export const TOTAL_POKEMON = 151;

export type Stat = {
  name: string; // "hp", "attack", "defense", "special-attack", "special-defense", "speed"
  value: number;
};

export type Pokemon = {
  id: number;
  name: string;
  types: string[]; // ex.: ["grass", "poison"]
  image: string; // big image (official artwork)
  shinyImage: string; // big image, shiny version
  sprite: string; // small animated image, used in the cards
  height: number; // in decimeters (7 = 0,7 m)
  weight: number; // in hectograms (69 = 6,9 kg)
  baseExperience: number;
  abilities: string[];
  stats: Stat[];
};

// Full example: https://pokeapi.co/api/v2/pokemon/1
export type ApiPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string; front_shiny: string };
    };
    versions: {
      "generation-v": {
        "black-white": { animated: { front_default: string | null } };
      };
    };
  };
};

export function toPokemon(data: ApiPokemon): Pokemon {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    image: data.sprites.other["official-artwork"].front_default,
    shinyImage: data.sprites.other["official-artwork"].front_shiny,
    sprite:
      data.sprites.versions["generation-v"]["black-white"].animated
        .front_default ?? data.sprites.front_default,
    abilities: data.abilities.map((item) => item.ability.name),
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const downloaded: Record<number, ApiPokemon> = {};

async function fetchApiPokemon(id: number): Promise<ApiPokemon> {
  if (USE_MOCK) {
    await wait(300);
    return MOCK_POKEMON[id - 1];
  }

  if (!downloaded[id]) {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(`Erro ao acessar a PokéAPI (código ${response.status}).`);
    }
    downloaded[id] = await response.json();
  }
  return downloaded[id];
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  if (!Number.isInteger(id) || id < 1 || id > TOTAL_POKEMON) {
    throw new Error("Pokémon não encontrado.");
  }

  const data = await fetchApiPokemon(id);
  return toPokemon(data);
}

export async function fetchPokemonList(): Promise<Pokemon[]> {
  const ids: number[] = [];
  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    ids.push(id);
  }
  return Promise.all(ids.map((id) => fetchPokemon(id)));
}
