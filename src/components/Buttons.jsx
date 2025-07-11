import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

export function Buttons({ text }) {
  return <StyledButton>{text}</StyledButton>;
}

export function Buttons2({ text }) {
  return <StyledButton>마이{text}</StyledButton>;
}

export function Buttons3({ text }) {
  return <StyledButton>my{text}</StyledButton>;
}