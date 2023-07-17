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

export const ProjectNameInput = styled.input`
  background: #fafafc;
  width: 255px;
  height: 24px;
  background-color: #bbeff2;
`;

export const EmailInput = styled.input`
  background: #fafafc;
  width: 255px;
  height: 24px;
  background-color: #bbeff2;
`;

export const UniqueIdInput = styled.input`
  background: #fafafc;
  width: 255px;
  height: 24px;
  background-color: #bbeff2;
`;

export const ProjectTypeDropDown = styled.div`
font-family: 'Mulish';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  border-radius: 8px;
`;

export const ProjectDropDownSelect = styled.select`
  background-color: #bbeff2;
  width: 255px;
  left: 0px;
  top: 0px;

  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.2px;
  /* display: none; // hide original SELECT element: */
`;

export const ProjectSelectSubmit = styled.button`
padding: 0.1rem 0.5rem;
top: 20px;
color: #fff;
background: #2F4BAE;
font-family: var(--font-family);
font-weight: 500;
font-size: 18px;
line-height: 25px;
border: none;
outline: none;
cursor: pointer;
border-radius: 5px;
`;