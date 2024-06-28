import { Button, Container, Form, Row } from "react-bootstrap";
// import { CenteredOverlayForm } from "./CenteredOverlayForm.jsx";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName.ts";
import { CenteredOverlayForm } from "./CenteredOverlayForm.tsx";
import styled from "styled-components";

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };
  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="align-item-start">
              <StyledH2>먼저, 정산이 필요한 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className="align-item-center">
              <Form.Group controlId="validationGroupName">
                <Form.Control
                  type="text"
                  required
                  placeholder=""
                  onChange={(e: any) => {
                    setGroupName(e.target.value);
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해 주세요
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="align-item-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
};

const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})<any>`
  background: #6610f2;
  border: none;
  border-radius: 8px;
  &:hover {
    background: #6610f2;
    filter: brightness(80%);
  }
`;

const StyledRow = styled(Row)`
  height: 60vh;
  align-items: center;
  justify-content: center;
`;
