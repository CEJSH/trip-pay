import { Button, Container, Form, Row } from "react-bootstrap";
// import { CenteredOverlayForm } from "./CenteredOverlayForm.jsx";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName.ts";

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
    <div>
      <h1>Dutch Pay</h1>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>먼저, 정산이 필요한 그룹의 이름을 정해볼까요?</Row>
          <Row>
            <Form.Group controlId="validationGroupName">
              <Form.Control
                type="text"
                required
                placeholder="what travel it is?"
                onChange={(e: any) => {
                  setGroupName(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
                그룹 이름을 입력해 주세요
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>
      {/* <CenteredOverlayForm /> */}
    </div>
  );
};
