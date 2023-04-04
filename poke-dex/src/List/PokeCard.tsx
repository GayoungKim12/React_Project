import styled from "@emotion/styled";
import PokeNameChip from "../Common/PokeNameChip";
import PokeMarkChip from "../Common/PokeMarkChip";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { RootState, useAppDispatch } from "../Store";
import { useSelector } from "react-redux";
import { fetchPokemonDetail } from "../Store/PokemonDetailSlice";

interface PokeCardProps {
  name: string;
}

const PokeCard = (props: PokeCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const imageType = useSelector((state: RootState) => state.imageType.type);
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const { pokemonDetails } = useSelector(
    (state: RootState) => state.pokemonDetails
  );
  const pokemon = pokemonDetails[props.name];

  const handleClick = () => {
    navigate(`/pokemon/${props.name}`);
  };

  useEffect(() => {
    if (!isVisible) return;
    dispatch(fetchPokemonDetail(props.name));
  }, [dispatch, props.name, isVisible]);

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
        <Img src={pokemon.images[imageType]} alt={pokemon.koreanName} />
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
  max-height: 180px;
`;

const Footer = styled.section`
  display: flex;
  margin-right: 12px;
  margin-bottom: 4px;
  justify-content: flex-end;
`;

export default PokeCard;
