import styled from "styled-components";

export const StyledHeader = styled.h1`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;
