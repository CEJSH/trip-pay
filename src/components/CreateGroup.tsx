import { Form } from "react-bootstrap";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { groupNameState } from "../state/groupName.ts";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm.tsx";
import { useNavigate } from "react-router-dom";

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupName = useSetRecoilState(groupNameState);
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      navigate("/members");
    } else {
      event.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };

  return (
    <CenteredOverlayForm
      title="먼저, 정산이 필요한 그룹의 이름을 정해볼까요?"
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group controlId="validationGroupName">
        <Form.Control
          type="text"
          required
          placeholder=""
          onChange={(e: any) => {
            setGroupName(e.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
          그룹 이름을 입력해 주세요
        </Form.Control.Feedback>
      </Form.Group>
    </CenteredOverlayForm>
  );
};
