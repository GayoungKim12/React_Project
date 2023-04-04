import styled from "@emotion/styled";

interface PokeNameChipProps {
  name: string;
  id: number;
  color: string;
}

const PokeNameChip = (props: PokeNameChipProps) => {
  const renderNumber = (id: number) => {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return id;
    }
  };

  return (
    <Chip>
      <Number color={props.color}>{renderNumber(props.id)}</Number>
      <Name>{props.name}</Name>
    </Chip>
  );
};

const Chip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  border-radius: 16px;
  background-color: #f3f3f3;
  font-size: 16px;
  border: 1px solid #c0c0c0;
  font-weight: bold;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: ${(props) => props.color};
  border-radius: 16px;
`;

const Name = styled.div`
  display: flex;
  margin-left: 8px;
`;

export default PokeNameChip;
