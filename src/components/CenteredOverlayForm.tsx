import { Container } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper";

export const CenteredOverlayForm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StyledCentralizedContainer>
      <StyledHeader>Smart Split</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCentralizedContainer>
  );
};

const StyledHeader = styled.h1`
  font-size: 40px;
  font-weight: 200;
  line-height: 48px;
  letter-spacing: 4px;
`;
const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;
