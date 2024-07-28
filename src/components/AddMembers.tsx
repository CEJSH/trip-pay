import { CenteredOverlayForm } from "./shared/CenteredOverlayForm";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { groupMemberState } from "../state/groupMembers";
import "react-bootstrap-tagsinput/dist/index.css";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { groupNameState } from "../state/groupName";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../route";
import { expensesState } from "../state/expenses";

export const AddMembers = () => {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMemberState);
  const groupName = useRecoilValue(groupNameState);
  const reset = useSetRecoilState(expensesState);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (groupName === undefined) {
      navigate("/");
      reset([]);
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setValidated(true);
    if (groupMembers.length > 0) {
      navigate(ROUTES.EXPENSE_MAIN);
    }
  };
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && location.pathname == "/members") {
      return alert("버튼을 눌러주세요 :)");
    }
  };

  const header = <StyledGroupName>{groupName}</StyledGroupName>;

  return (
    <CenteredOverlayForm
      title={header}
      handleSubmit={handleSubmit}
      validated={validated}
    >
      <InputTags
        onKeyDown={handleEnter}
        data-testid="input-member-names"
        placeholder="이름 간 띄어쓰기(Space Bar) 해주세요"
        onTags={(value) => {
          setGroupMembers(value.values);
        }}
      />
      {validated && groupMembers.length === 0 && (
        <StyledErrorMessage>
          그룹 멤버들의 이름을 입력해 주세요
        </StyledErrorMessage>
      )}
    </CenteredOverlayForm>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
`;
const StyledGroupName = styled.h2`
  display: inline;
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
  color: #6610f2;
`;
