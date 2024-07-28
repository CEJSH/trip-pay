import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { expensesState } from "../../state/expenses";
export default function ServiceLogo() {
  const navigate = useNavigate();
  const reset = useSetRecoilState(expensesState);
  return (
    <StyledLogo
      onClick={() => {
        navigate("/");
        reset([]);
      }}
    >
      Trip Pay
    </StyledLogo>
  );
}

const StyledLogo = styled.h1`
  font-size: 42px;
  font-weight: 700;
  line-height: 56px;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #6610f2;
  &:hover {
    cursor: pointer;
  }
`;
