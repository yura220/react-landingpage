import styled from "styled-components";

const StyledButton = styled.a`
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

const RequestBtn = ({ text,text2 }) => {
  return( 
          <>
            <StyledButton>{text}</StyledButton>
            <StyledButton>{text2}</StyledButton>
          </>
        );
};

export default RequestBtn;