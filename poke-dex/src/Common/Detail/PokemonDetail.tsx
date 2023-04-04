import styled from "@emotion/styled";
import PokeMarkChip from "../PokeMarkChip";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PokemonDetailType,
  fetchPokemonDetail,
} from "../../Service/PokemonService";
import { PokeImageSkeleton } from "../PokeImageSkeleton";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);

  useEffect(() => {
    if (!name) return;

    (async () => {
      const detail = await fetchPokemonDetail(name);
      setPokemon(detail);
    })();
  }, [name]);

  if (!name || !pokemon) {
    return (
      <Container>
        <ImgContainer>
          <PokeImageSkeleton />
        </ImgContainer>
        <Divider />
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Container>
    );
  }

  return (
    <Container>
      <ImgContainer>
        <Img
          src={pokemon.images.officialArtworkFront}
          alt={pokemon.koreanName}
        />
      </ImgContainer>
      <Divider />
      <Body>
        <h2>기본 정보</h2>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>번호</TableHeader>
              <td>{pokemon.id}</td>
            </TableRow>
            <TableRow>
              <TableHeader>이름</TableHeader>
              <td>
                {pokemon.koreanName} ({pokemon.name})
              </td>
            </TableRow>
            <TableRow>
              <TableHeader>타입</TableHeader>
              <td>{pokemon.types.join()}</td>
            </TableRow>
            <TableRow>
              <TableHeader>키</TableHeader>
              <td>{pokemon.height} m</td>
            </TableRow>
            <TableRow>
              <TableHeader>몸무게</TableHeader>
              <td>{pokemon.weight} kg</td>
            </TableRow>
          </tbody>
        </Table>
        <h2>능력치</h2>
        <Table>
          <tbody>
            {pokemon.baseStats.map((stat) => {
              return (
                <TableRow key={stat.name}>
                  <TableHeader>{stat.name}</TableHeader>
                  <td>{stat.value}</td>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Container>
  );
};

const Container = styled.section`
  padding: 32px;
  border: 1px solid #c0c0c0;
  border-radius: 16px;
  box-shadow: 1px 1px 2px 1px #c0c0c0;
  margin: 16px 32px;
`;

const ImgContainer = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  min-height: 320px;
`;

const Img = styled.img`
  width: 320px;
  width: 320px;
`;

const Divider = styled.hr`
  margin: 32px 0;
  border-style: none;
  border-top: 1px dashed #d3d3d3;
`;

const Body = styled.section``;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  th,
  td {
    padding: 6px 12px;
  }
`;

const TableRow = styled.tr`
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;

const TableHeader = styled.th`
  width: 1px;
  white-space: nowrap;
  text-align: left;
  font-weight: normal;
  font-size: 14px;
  color: #a0a0a0;
`;

const Footer = styled.section`
  display: flex;
  margin-top: 32px;
  justify-content: flex-end;
`;

export default PokemonDetail;
