import axios from "axios";

export interface PokemonListResponseType {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

export const fetchPokemonsAPI = async (nextUrl?: string) => {
  const defaultUrl = nextUrl ? nextUrl : "https://pokeapi.co/api/v2/pokemon";
  const response = await axios.get<PokemonListResponseType>(defaultUrl);

  return response.data;
};

interface PokemonDetailResponseType {
  id: number;
  weight: number;
  height: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface pokemonSpeciesResponseType {
  color: {
    name: string;
  };
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}

export interface PokemonDetailType {
  id: number;
  weight: number;
  height: number;
  name: string;
  koreanName: string;
  color: string;
  types: string[];
  images: {
    frontDefault: string;
    dreamWorldFront: string;
    officialArtworkFront: string;
  };
  baseStats: {
    name: string;
    value: number;
  }[];
}

export const fetchPokemonDetailAPI = async (
  name: string
): Promise<PokemonDetailType> => {
  const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

  const response = await axios.get<PokemonDetailResponseType>(pokemonDetailUrl);
  const speciesResponse = await axios.get<pokemonSpeciesResponseType>(
    pokemonSpeciesUrl
  );

  const detail = response.data;
  const species = speciesResponse.data;

  const koreanName =
    species.names.find((item) => {
      return item.language.name === "ko";
    })?.name ?? detail.name;

  return {
    id: detail.id,
    weight: detail.weight / 10,
    height: detail.height / 10,
    name: detail.name,
    koreanName,
    color: species.color.name,
    types: detail.types.map((item) => item.type.name),
    images: {
      frontDefault: detail.sprites.front_default,
      dreamWorldFront: detail.sprites.other.dream_world.front_default,
      officialArtworkFront:
        detail.sprites.other["official-artwork"].front_default,
    },
    baseStats: detail.stats.map((item) => {
      return {
        name: item.stat.name,
        value: item.base_stat,
      };
    }),
  };
};
