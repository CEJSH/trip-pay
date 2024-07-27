import styled from "styled-components";

export default function ServiceLogo() {
  return <StyledLogo>Trip Pay</StyledLogo>;
}

const StyledLogo = styled.h1`
  font-size: 42px;
  font-weight: 700;
  line-height: 56px;
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  color: #6610f2;
`;
