import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PokemonDetailType,
  fetchPokemonDetailAPI,
} from "../Service/PokemonService";
import { RootState } from ".";

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (name: string) => {
    const response = await fetchPokemonDetailAPI(name);
    return response;
  },
  {
    condition: (name, { getState }) => {
      const { pokemonDetails } = getState() as RootState;
      const pokemon = pokemonDetails.pokemonDetails[name];
      return !pokemon;
    },
  }
);

interface PokemonDetailState {
  // pokemonDetails: {
  //   "이상해씨": PokemonDetailType;
  //   "피카츄": PokemonDetailType;
  // };
  pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
  pokemonDetails: {},
} as PokemonDetailState;

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchPokemonDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailType>) => {
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokemonDetailReducer = pokemonDetailSlice.reducer;
