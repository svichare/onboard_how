import styled from "styled-components";

export const Container = styled.div`
  font-family: Consolas, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 100;

  padding: 0 40px;
`;

export const TopImage = styled.img`
width: 50%;
height: 25%;
`;

export const TextInput = styled.textarea`
width: 50%;
height: 25%;
rows: 2;
`;

export const GenericInput = styled.input`
padding: 100x;
margin-left: 10px;
`;

export const SmallTextInput = styled.textarea`
width: 25%;
height: 20px;
border: 1px solid #ccc;
max-width: 100%;
margin-left: 10px;
box-sizing: border-box;
overflow: hidden;
text-overflow: ellipsis;
`;
