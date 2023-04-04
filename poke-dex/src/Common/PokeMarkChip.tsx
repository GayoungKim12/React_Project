import styled from "@emotion/styled";

const PokeMarkChip = () => {
  return <Chip>Pokémon</Chip>;
};

const Chip = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4px;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #c0c0c0;
  font-size: 14px;
  font-weight: bold;
`;

export default PokeMarkChip;
