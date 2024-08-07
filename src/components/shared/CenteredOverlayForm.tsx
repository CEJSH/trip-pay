import { Button, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./OverlayWrapper";
import ServiceLogo from "./ServiceLogo";
import { useLocation } from "react-router-dom";

export const CenteredOverlayForm = ({
  children,
  title,
  handleSubmit,
  validated,
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
  handleSubmit?: (event: any) => void;
  validated?: boolean;
}) => {
  const { pathname } = useLocation();
  return (
    <StyledCentralizedContainer>
      <ServiceLogo />
      <OverlayWrapper>
        {/* {children} */}
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledCentralizedRow>
              <Row className="align-item-start">
                {pathname === "/members" ? (
                  <StyledTitle>
                    {title} 멤버의 이름을 모두 입력해 주세요.
                  </StyledTitle>
                ) : (
                  <StyledTitle>{title}</StyledTitle>
                )}
              </Row>
              <Row className="align-item-center">{children}</Row>
              <Row className="align-item-end">
                <StyledSubmitButton>저장</StyledSubmitButton>
              </Row>
            </StyledCentralizedRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
};

const StyledCentralizedContainer = styled(Container)`
  min-width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})<any>`
  width: 60%;
  height: 6vh;
  margin: 0 auto;
  background: #6610f2;
  border: none;
  border-radius: 8px;
  letter-spacing: 1.5px;
  &:hover {
    background: #6610f2;
    filter: brightness(80%);
  }
`;

const StyledCentralizedRow = styled(Row)`
  max-width: 500px;
  height: 60vh;
  align-items: center;
  justify-content: center;
`;
