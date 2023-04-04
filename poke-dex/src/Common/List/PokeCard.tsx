import styled from "@emotion/styled";
import PokeNameChip from "../PokeNameChip";
import PokeMarkChip from "../PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PokemonDetailType,
  fetchPokemonDetail,
} from "../../Service/PokemonService";
import { PokeImageSkeleton } from "../PokeImageSkeleton";
import { useIntersectionObserver } from "react-intersection-observer-hook";

interface PokeCardProps {
  name: string;
}

const PokeCard = (props: PokeCardProps) => {
  const navigate = useNavigate();
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);

  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    if (!isVisible) return;

    (async () => {
      const detail = await fetchPokemonDetail(props.name);
      setPokemon(detail);
    })();
  }, [props.name, isVisible]);

  if (!pokemon) {
    return (
      <Item ref={ref} color={"#fff"}>
        <Header>
          <PokeNameChip name={"포켓몬"} id={0} color={"#ffca09"} />
        </Header>
        <Body>
          <PokeImageSkeleton />
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Item>
    );
  }

  return (
    <Item ref={ref} color={pokemon.color} onClick={handleClick}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          id={pokemon.id}
          color={pokemon.color}
        />
      </Header>
      <Body>
        <Img
          src={pokemon.images.officialArtworkFront}
          alt={pokemon.koreanName}
        />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Item>
  );
};

const Item = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 8px;
  width: 250px;
  height: 300px;
  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: ${(props) => props.color};
    opacity: 0.6;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
`;

const Body = styled.section`
  display: flex;
  margin: 16px auto;
`;

const Img = styled.img`
  width: 180px;
`;

const Footer = styled.section`
  display: flex;
  margin-right: 12px;
  margin-bottom: 4px;
  justify-content: flex-end;
`;

export default PokeCard;
