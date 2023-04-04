import styled from "@emotion/styled";
import PokeCard from "./PokeCard";
import {
  PokemonListResponseType,
  fetchPokemons,
} from "../../Service/PokemonService";
import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

const PokeCardList = () => {
  const [pokemons, setPokemons] = useState<PokemonListResponseType>({
    count: 0,
    next: "",
    results: [],
  });

  const getNextPokemons = async () => {
    const morePokemons = await fetchPokemons(pokemons.next);
    setPokemons({
      ...morePokemons,
      results: [...pokemons.results, ...morePokemons.results],
    });
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: getNextPokemons,
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    (async () => {
      const result = await fetchPokemons();
      setPokemons(result);
    })();
  }, []);

  return (
    <>
      <List>
        {pokemons.results.map((pokemon, idx) => {
          return <PokeCard key={`${pokemon}_${idx}`} name={pokemon.name} />;
        })}
      </List>
      <Loading ref={infiniteRef}>Loading...</Loading>
    </>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: #c0c0c0;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 0 auto 32px;
  padding: 0;
  list-style: none;
`;

export default PokeCardList;
